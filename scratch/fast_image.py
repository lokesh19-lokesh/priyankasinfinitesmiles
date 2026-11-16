import struct
import subprocess
import os
import math

class FastImage:
    def __init__(self, w, h):
        self.w = w
        self.h = h
        self.r = [0] * (w * h)
        self.g = [0] * (w * h)
        self.b = [0] * (w * h)

    @classmethod
    def load(cls, path):
        tmp_bmp = f'/tmp/fi_{os.getpid()}_{os.path.basename(path)}.bmp'
        subprocess.run(['sips', '-s', 'format', 'bmp', path, '--out', tmp_bmp], check=True, stdout=subprocess.DEVNULL)
        with open(tmp_bmp, 'rb') as f:
            header = f.read(54)
            w = struct.unpack('<i', header[18:22])[0]
            h = abs(struct.unpack('<i', header[22:26])[0])
            raw = bytearray(f.read())
        try:
            os.remove(tmp_bmp)
        except:
            pass
        img = cls(w, h)
        row_size = ((w * 3 + 3) // 4) * 4
        for y in range(h):
            for x in range(w):
                src_idx = y * row_size + x * 3
                dst_idx = y * w + x
                img.b[dst_idx] = raw[src_idx]
                img.g[dst_idx] = raw[src_idx + 1]
                img.r[dst_idx] = raw[src_idx + 2]
        return img

    def clone(self):
        img = FastImage(self.w, self.h)
        img.r = list(self.r)
        img.g = list(self.g)
        img.b = list(self.b)
        return img

    def get_pixel(self, x, y):
        if 0 <= x < self.w and 0 <= y < self.h:
            idx = y * self.w + x
            return self.r[idx], self.g[idx], self.b[idx]
        return 0, 0, 0

    def set_pixel(self, x, y, r, g, b):
        if 0 <= x < self.w and 0 <= y < self.h:
            idx = y * self.w + x
            self.r[idx] = max(0, min(255, int(r)))
            self.g[idx] = max(0, min(255, int(g)))
            self.b[idx] = max(0, min(255, int(b)))

    def blend_pixel(self, x, y, r, g, b, alpha):
        if 0 <= x < self.w and 0 <= y < self.h:
            idx = y * self.w + x
            inv = 1.0 - alpha
            self.r[idx] = max(0, min(255, int(self.r[idx] * inv + r * alpha)))
            self.g[idx] = max(0, min(255, int(self.g[idx] * inv + g * alpha)))
            self.b[idx] = max(0, min(255, int(self.b[idx] * inv + b * alpha)))

    def save(self, out_path):
        tmp_bmp = f'/tmp/fo_{os.getpid()}_{os.path.basename(out_path)}.bmp'
        row_size = ((self.w * 3 + 3) // 4) * 4
        file_size = 54 + row_size * self.h
        header = bytearray(54)
        header[0:2] = b'BM'
        struct.pack_into('<I', header, 2, file_size)
        struct.pack_into('<I', header, 10, 54)
        struct.pack_into('<I', header, 14, 40)
        struct.pack_into('<i', header, 18, self.w)
        struct.pack_into('<i', header, 22, -self.h) # top-down
        struct.pack_into('<H', header, 26, 1)
        struct.pack_into('<H', header, 28, 24)
        struct.pack_into('<I', header, 34, row_size * self.h)

        raw = bytearray(row_size * self.h)
        for y in range(self.h):
            for x in range(self.w):
                src_idx = y * self.w + x
                dst_idx = y * row_size + x * 3
                raw[dst_idx] = self.b[src_idx]
                raw[dst_idx + 1] = self.g[src_idx]
                raw[dst_idx + 2] = self.r[src_idx]

        with open(tmp_bmp, 'wb') as f:
            f.write(header)
            f.write(raw)

        fmt = 'png' if out_path.endswith('.png') else 'jpeg'
        subprocess.run(['sips', '-s', 'format', fmt, tmp_bmp, '--out', out_path], check=True, stdout=subprocess.DEVNULL)
        try:
            os.remove(tmp_bmp)
        except:
            pass
        print(f'Wrote {out_path} ({self.w}x{self.h})')

print('FastImage engine ready.')
