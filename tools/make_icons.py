"""生成极简新标签页图标（纯标准库，4x4 超采样抗锯齿）。
用法: python3 tools/make_icons.py
"""
import math
import os
import struct
import zlib

OUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "icons")
SS = 4  # 每个像素的子采样数（SS x SS）


def inside_round(x, y, r):
    """圆角矩形（0..1 画布）内部的判定"""
    cx = min(max(x, r), 1 - r)
    cy = min(max(y, r), 1 - r)
    return math.hypot(x - cx, y - cy) <= r


def mix(c1, c2, t):
    return tuple(c1[i] + (c2[i] - c1[i]) * t for i in range(3))


def render(size):
    ring_r = 0.252 if size >= 48 else 0.268
    ring_w = 0.056 if size >= 48 else 0.095
    dot_r = 0.046 if size >= 48 else 0.075
    corner = 0.225

    top = (0x27, 0x2c, 0x34)
    bottom = (0x0a, 0x0b, 0x0d)

    rows = []
    for py in range(size):
        row = bytearray()
        for px in range(size):
            acc_r = acc_g = acc_b = acc_a = 0.0
            for sy in range(SS):
                for sx in range(SS):
                    fx = (px + (sx + 0.5) / SS) / size
                    fy = (py + (sy + 0.5) / SS) / size
                    if not inside_round(fx, fy, corner):
                        continue
                    # 背景：纵向渐变 + 左上柔光
                    c = mix(top, bottom, fy ** 0.85)
                    glow = max(0.0, 1.0 - math.hypot(fx - 0.28, fy + 0.06) / 1.05) ** 2 * 0.16
                    c = tuple(min(255, v + 255 * glow) for v in c)
                    # 白色元素：圆环 + 中心点
                    d = math.hypot(fx - 0.5, fy - 0.5)
                    if abs(d - ring_r) <= ring_w / 2 or d <= dot_r:
                        k = 0.96
                        c = tuple(v + (255 - v) * k for v in c)
                    acc_r += c[0]
                    acc_g += c[1]
                    acc_b += c[2]
                    acc_a += 1.0
            n = SS * SS
            a = acc_a / n
            if a <= 0:
                row += bytes((0, 0, 0, 0))
            else:
                row += bytes((
                    int(round(acc_r / acc_a)),
                    int(round(acc_g / acc_a)),
                    int(round(acc_b / acc_a)),
                    int(round(a * 255)),
                ))
        rows.append(bytes(row))
    return rows


def write_png(path, size, rows):
    raw = b"".join(b"\x00" + r for r in rows)

    def chunk(tag, data):
        return (struct.pack(">I", len(data)) + tag + data
                + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF))

    png = (b"\x89PNG\r\n\x1a\n"
           + chunk(b"IHDR", struct.pack(">IIBBBBB", size, size, 8, 6, 0, 0, 0))
           + chunk(b"IDAT", zlib.compress(raw, 9))
           + chunk(b"IEND", b""))
    with open(path, "wb") as f:
        f.write(png)


if __name__ == "__main__":
    os.makedirs(OUT_DIR, exist_ok=True)
    for s in (16, 32, 48, 128):
        write_png(os.path.join(OUT_DIR, f"icon{s}.png"), s, render(s))
        print("wrote", os.path.join(OUT_DIR, f"icon{s}.png"))
