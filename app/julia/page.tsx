import type { Metadata } from "next";
import Image from "next/image";
import { Contagem, ConviteSelado, Lacre } from "./interativos";

// ─── CONFIG DO EVENTO ── edite só aqui ──────────────────────────────
const EVENTO = {
  aniversariante: "Julia",
  dataISO: "2026-08-22T19:30:00-03:00", // horário oficial (fuso de Brasília)
  dataPorExtenso: "Sábado, 22 de agosto",
  horario: "19h30",
  duracaoHoras: 3, // usada no evento da agenda (.ics)
  endereco: "R. Ana Gealh, 39 — Maringá/PR",
  traje: "Casual",
  recado: "Vem comemorar com a gente.",
  whatsapp: "5544997072891", // DDI + DDD + número, só dígitos
  mensagem:
    "Confirmando minha presença no aniversário da Julia — sábado, 22 de agosto, às 19h30 ✦",
  urlSite: "https://julia-convite.vercel.app", // ajuste após o deploy
};
// ────────────────────────────────────────────────────────────────────

const LINK_WHATSAPP = `https://wa.me/${EVENTO.whatsapp}?text=${encodeURIComponent(
  EVENTO.mensagem
)}`;

export async function generateMetadata(): Promise<Metadata> {
  const titulo = `Aniversário da ${EVENTO.aniversariante} ✦`;
  const descricao = `${EVENTO.dataPorExtenso}, ${EVENTO.horario}. Rompa o lacre e confirme sua presença.`;
  return {
    metadataBase: new URL(EVENTO.urlSite),
    title: titulo,
    description: descricao,
    openGraph: {
      title: titulo,
      description: descricao,
      type: "website",
      locale: "pt_BR",
      url: "/julia",
    },
  };
}

function Ornamento() {
  return (
    <div aria-hidden className="flex items-center justify-center gap-3">
      <span className="h-px w-12 bg-ouro-escuro/40" />
      <span className="text-xs text-ouro-escuro">✦</span>
      <span className="h-px w-12 bg-ouro-escuro/40" />
    </div>
  );
}

export default function PaginaConvite() {
  return (
    <ConviteSelado>
      <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-4 py-6">
        {/* moldura dupla dourada sobre o veludo */}
        <div className="entra rounded-[6px] border border-ouro/50 p-1.5 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)]">
          <div className="rounded-[4px] bg-marfim text-tinta">
            <div className="rounded-[3px] border border-ouro-escuro/30 px-6 pb-8 pt-9">
              {/* 1 · Hero */}
              <header className="entra text-center">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-lacre">
                  Convite de aniversário
                </p>

                <div className="relative mx-auto mt-6 h-[16.25rem] w-[12.5rem]">
                  {/* moldura de filigrana: pérolas, filetes, volutas e diamantes */}
                  <svg
                    viewBox="0 0 200 260"
                    className="absolute inset-0 h-full w-full"
                    aria-hidden="true"
                  >
                    <g fill="none" stroke="#8A6A32" strokeLinecap="round">
                      <ellipse
                        cx="100"
                        cy="130"
                        rx="82"
                        ry="102"
                        strokeWidth="2.4"
                        strokeDasharray="0.1 9"
                        opacity="0.85"
                      />
                      <ellipse
                        cx="100"
                        cy="130"
                        rx="88"
                        ry="108"
                        strokeWidth="1"
                        opacity="0.45"
                      />
                      <ellipse
                        cx="100"
                        cy="130"
                        rx="77"
                        ry="97"
                        strokeWidth="1.2"
                        opacity="0.9"
                      />
                      <g strokeWidth="1.6">
                        <path d="M97 12 C 86 3, 71 3, 65 10 C 61 15, 64 21, 69 20 C 73 19, 73 14, 69 14" />
                        <path d="M103 12 C 114 3, 129 3, 135 10 C 139 15, 136 21, 131 20 C 127 19, 127 14, 131 14" />
                      </g>
                      <g strokeWidth="1.6" transform="translate(0 260) scale(1 -1)">
                        <path d="M97 12 C 86 3, 71 3, 65 10 C 61 15, 64 21, 69 20 C 73 19, 73 14, 69 14" />
                        <path d="M103 12 C 114 3, 129 3, 135 10 C 139 15, 136 21, 131 20 C 127 19, 127 14, 131 14" />
                      </g>
                    </g>
                    <path d="M100 4 L103.2 11 L100 18 L96.8 11 Z" fill="#8A6A32" />
                    <path
                      d="M100 242 L103.2 249 L100 256 L96.8 249 Z"
                      fill="#8A6A32"
                    />
                    <path
                      d="M8 126.5 l4 3.5 -4 3.5 -4 -3.5 Z"
                      fill="#8A6A32"
                      opacity="0.7"
                    />
                    <path
                      d="M192 126.5 l4 3.5 -4 3.5 -4 -3.5 Z"
                      fill="#8A6A32"
                      opacity="0.7"
                    />
                  </svg>
                  <div className="absolute left-1/2 top-1/2 h-48 w-[9.5rem] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[50%]">
                    <Image
                      src="/julia.jpg"
                      alt={`Foto da ${EVENTO.aniversariante}`}
                      width={640}
                      height={480}
                      priority
                      className="h-full w-full object-cover"
                      style={{ objectPosition: "46% 22%" }}
                    />
                  </div>
                </div>

                <h1 className="mt-5">
                  <span className="block text-lg italic text-ouro-escuro">
                    Uma noite para celebrar
                  </span>
                  <span className="mt-1 block font-pinyon text-7xl leading-none text-lacre">
                    {EVENTO.aniversariante}
                  </span>
                </h1>

                <p className="mt-4 text-lg font-medium text-tinta">
                  <time dateTime={EVENTO.dataISO}>
                    {EVENTO.dataPorExtenso} · {EVENTO.horario}
                  </time>
                </p>
              </header>

              <div className="mt-7">
                <Ornamento />
              </div>

              {/* 2 · Contagem regressiva */}
              <section
                className="entra mt-7"
                style={{ animationDelay: "120ms" }}
                aria-label="Contagem regressiva para a noite"
              >
                <Contagem alvoISO={EVENTO.dataISO} />
              </section>

              {/* 3 · Detalhes */}
              <section className="entra mt-8" style={{ animationDelay: "240ms" }}>
                <h2 className="text-center text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-lacre">
                  A noite
                </h2>

                <dl className="mt-4 divide-y divide-lacre/15 border-y border-lacre/15">
                  <div className="flex items-baseline gap-6 py-3">
                    <dt className="w-16 shrink-0 text-xs font-semibold uppercase tracking-[0.2em] text-ouro-escuro">
                      Onde
                    </dt>
                    <dd className="text-base">
                      <address className="not-italic">{EVENTO.endereco}</address>
                    </dd>
                  </div>
                  <div className="flex items-baseline gap-6 py-3">
                    <dt className="w-16 shrink-0 text-xs font-semibold uppercase tracking-[0.2em] text-ouro-escuro">
                      Traje
                    </dt>
                    <dd className="text-base">{EVENTO.traje}</dd>
                  </div>
                </dl>

                <p className="mt-5 text-center text-lg italic text-lacre">
                  “{EVENTO.recado}”
                </p>
              </section>

              {/* 4 · Confirmação e apoios */}
              <section
                className="entra mt-8"
                style={{ animationDelay: "360ms" }}
                aria-label="Confirmar presença"
              >
                <a
                  href={LINK_WHATSAPP}
                  className="flex min-h-14 w-full items-center justify-center rounded-full bg-lacre px-6 text-lg font-semibold text-champanhe transition-colors hover:bg-vinho"
                >
                  Confirmar presença
                </a>
              </section>

              {/* o lacre reaparece como carimbo de despedida */}
              <footer
                className="entra mt-8 flex flex-col items-center"
                style={{ animationDelay: "480ms" }}
              >
                <Lacre className="h-10 w-10 opacity-90" />
                <p className="mt-2 text-sm italic text-ouro-escuro">
                  Aguardamos você
                </p>
              </footer>
            </div>
          </div>
        </div>
      </main>
    </ConviteSelado>
  );
}
