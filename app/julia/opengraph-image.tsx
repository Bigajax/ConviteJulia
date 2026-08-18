import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Convite: aniversário da Julia — Sábado, 22 de agosto, 19h30";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Mantenha em sincronia com o objeto EVENTO em page.tsx
const NOME = "Julia";
const DATA = "Sábado, 22 de agosto · 19h30";

async function carregaFonte(familia: string): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=${familia}&display=swap`,
      { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 6.1)" } }
    ).then((r) => r.text());
    const url = css.match(/src: url\((.+?)\) format\('truetype'\)/)?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function ImagemOG() {
  let foto: ArrayBuffer | null = null;
  try {
    foto = await fetch(new URL("./foto.jpg", import.meta.url)).then((r) =>
      r.arrayBuffer()
    );
  } catch {}

  const [pinyon, cormorant] = await Promise.all([
    carregaFonte("Pinyon+Script"),
    carregaFonte("Cormorant+Garamond:wght@500"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background:
            "radial-gradient(130% 120% at 50% 0%, #5A1220 0%, #3F0B14 55%, #24050B 100%)",
          padding: "64px 80px",
          fontFamily: cormorant ? "Cormorant" : "serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 28,
            left: 28,
            right: 28,
            bottom: 28,
            border: "1px solid rgba(201, 164, 92, 0.55)",
            borderRadius: 4,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 36,
            left: 36,
            right: 36,
            bottom: 36,
            border: "1px solid rgba(201, 164, 92, 0.3)",
            borderRadius: 2,
            display: "flex",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
          <div
            style={{
              color: "#C9A45C",
              fontSize: 24,
              letterSpacing: 12,
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            Convite de aniversário
          </div>
          <div
            style={{
              color: "#E8D5A8",
              fontSize: 42,
              fontStyle: "italic",
              marginTop: 36,
              display: "flex",
            }}
          >
            Uma noite para celebrar
          </div>
          <div
            style={{
              color: "#E8D5A8",
              fontSize: 170,
              lineHeight: 1.1,
              marginTop: 0,
              display: "flex",
              fontFamily: pinyon ? "Pinyon" : "cursive",
            }}
          >
            {NOME}
          </div>
          <div
            style={{
              color: "#C9A45C",
              fontSize: 34,
              marginTop: 24,
              display: "flex",
            }}
          >
            {DATA}
          </div>
        </div>

        {foto ? (
          <div
            style={{
              display: "flex",
              border: "2px solid #C9A45C",
              borderRadius: "50%",
              padding: 12,
            }}
          >
            <img
              src={foto as unknown as string}
              width={330}
              height={430}
              style={{
                borderRadius: "50%",
                objectFit: "cover",
                objectPosition: "46% 22%",
              }}
            />
          </div>
        ) : (
          <div style={{ color: "#C9A45C", fontSize: 120, display: "flex" }}>
            ✦
          </div>
        )}
      </div>
    ),
    {
      ...size,
      fonts: [
        ...(pinyon
          ? [{ name: "Pinyon", data: pinyon, weight: 400 as const }]
          : []),
        ...(cormorant
          ? [{ name: "Cormorant", data: cormorant, weight: 500 as const }]
          : []),
      ],
    }
  );
}
