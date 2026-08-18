"use client";

import { Fragment, useState, useEffect, type ReactNode } from "react";
import Image from "next/image";

/* ── Lacre de cera (foto real com fundo recortado) ─────────────── */

export function Lacre({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/lacre.png"
      alt=""
      aria-hidden="true"
      width={600}
      height={626}
      draggable={false}
      className={`select-none object-contain ${className}`}
    />
  );
}

/* ── Envelope lacrado que revela o convite ─────────────────────── */

export function ConviteSelado({ children }: { children: ReactNode }) {
  const [fase, setFase] = useState<"selado" | "abrindo" | "aberto">("selado");

  const abrir = () => {
    if (fase !== "selado") return;
    const semMovimento = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (semMovimento) {
      setFase("aberto");
      return;
    }
    setFase("abrindo");
    setTimeout(() => setFase("aberto"), 1350);
  };

  return (
    <>
      {fase !== "aberto" && (
        <div
          className={`palco-selado relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 ${
            fase === "abrindo" ? "abrindo" : ""
          }`}
        >
          {/* estrelas cintilando no veludo */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <span
              className="cintila absolute left-[14%] top-[16%] text-xs text-ouro"
              style={{ animationDelay: "0s" }}
            >
              ✦
            </span>
            <span
              className="cintila absolute right-[12%] top-[24%] text-sm text-ouro"
              style={{ animationDelay: "1.1s" }}
            >
              ✦
            </span>
            <span
              className="cintila absolute bottom-[26%] left-[18%] text-sm text-ouro"
              style={{ animationDelay: "2s" }}
            >
              ✦
            </span>
            <span
              className="cintila absolute bottom-[14%] right-[20%] text-xs text-ouro"
              style={{ animationDelay: "0.6s" }}
            >
              ✦
            </span>
            <span
              className="cintila absolute left-[7%] top-[52%] text-[0.6rem] text-ouro"
              style={{ animationDelay: "1.6s" }}
            >
              ✦
            </span>
            <span
              className="cintila absolute right-[8%] top-[62%] text-[0.6rem] text-ouro"
              style={{ animationDelay: "2.6s" }}
            >
              ✦
            </span>
          </div>

          <p className="font-pinyon text-6xl text-champanhe">Convite</p>
          <p className="mt-3 text-[0.7rem] font-medium uppercase tracking-[0.4em] text-ouro">
            Aniversário da Julia
          </p>
          <div aria-hidden className="mt-5 flex items-center gap-3">
            <span className="h-px w-10 bg-ouro/40" />
            <span className="text-[0.6rem] text-ouro">✦</span>
            <span className="h-px w-10 bg-ouro/40" />
          </div>

          {/* envelope pousado no veludo, de leve fora do esquadro */}
          <div className="palco-envelope mt-10 w-full max-w-xs -rotate-2">
            <div className="envelope-flutua relative h-52 w-full rounded-[5px] bg-gradient-to-b from-[#6B1622] to-[#47101A] shadow-[0_35px_70px_-15px_rgba(0,0,0,0.8)]">
              {/* dobras do corpo do envelope */}
              <div
                aria-hidden
                className="absolute inset-0 bg-[#521221] [clip-path:polygon(0_0,50%_55%,0_100%)]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[#521221] [clip-path:polygon(100%_0,50%_55%,100%_100%)]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[#5E1526] [clip-path:polygon(0_100%,50%_48%,100%_100%)]"
              />
              {/* dedicatória à mão no canto */}
              <span
                aria-hidden
                className="absolute bottom-3 right-5 z-[5] -rotate-3 font-pinyon text-2xl text-champanhe/70"
              >
                para você
              </span>
              {/* aba com fio dourado na borda */}
              <div
                aria-hidden
                className="aba absolute inset-x-0 top-0 z-10 h-[58%] bg-gradient-to-b from-[#75182A] to-[#521221] [backface-visibility:hidden] [clip-path:polygon(0_0,100%_0,50%_100%)] [filter:drop-shadow(0_1.5px_0_rgba(201,164,92,0.4))_drop-shadow(0_8px_10px_rgba(0,0,0,0.35))]"
              />
              {/* luz de vela pulsando atrás do lacre */}
              <span
                aria-hidden
                className="brilho-selo absolute left-1/2 top-[56%] z-[15] h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full"
              />
              {/* lacre sobre a ponta da aba */}
              <span className="absolute left-1/2 top-[56%] z-20 -translate-x-1/2 -translate-y-1/2">
                <button
                  type="button"
                  onClick={abrir}
                  aria-label="Romper o lacre e abrir o convite"
                  className="selo block rounded-full drop-shadow-[0_10px_14px_rgba(0,0,0,0.5)]"
                >
                  <Lacre className="h-24 w-24" />
                </button>
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={abrir}
            className="mt-10 text-sm italic tracking-wide text-champanhe/70 transition-colors hover:text-champanhe"
          >
            Toque no lacre para abrir
          </button>
        </div>
      )}

      <div hidden={fase !== "aberto"}>{fase === "aberto" && children}</div>
    </>
  );
}

/* ── Contagem regressiva ───────────────────────────────────────── */

type Restante =
  | { dias: number; horas: number; minutos: number; segundos: number }
  | "hoje";

export function Contagem({ alvoISO }: { alvoISO: string }) {
  const [restante, setRestante] = useState<Restante | null>(null);

  useEffect(() => {
    const alvo = new Date(alvoISO).getTime();

    const calcula = () => {
      const diff = alvo - Date.now();
      if (diff <= 0) {
        setRestante("hoje");
        return;
      }
      const segundosTotais = Math.floor(diff / 1_000);
      const minutosTotais = Math.floor(segundosTotais / 60);
      setRestante({
        dias: Math.floor(minutosTotais / 1_440),
        horas: Math.floor((minutosTotais % 1_440) / 60),
        minutos: minutosTotais % 60,
        segundos: segundosTotais % 60,
      });
    };

    calcula();
    const id = setInterval(calcula, 1_000);
    return () => clearInterval(id);
  }, [alvoISO]);

  if (restante === "hoje") {
    return (
      <p className="text-center text-4xl font-semibold text-lacre">
        É hoje! <span aria-hidden>✦</span>
      </p>
    );
  }

  const celulas = [
    { valor: restante?.dias, rotulo: "dias", vivo: false },
    { valor: restante?.horas, rotulo: "horas", vivo: false },
    { valor: restante?.minutos, rotulo: "min", vivo: false },
    { valor: restante?.segundos, rotulo: "seg", vivo: true },
  ];

  return (
    <div>
      <p className="text-center text-lg italic text-ouro-escuro">faltam</p>
      <div className="mt-2 flex items-baseline justify-center">
        {celulas.map((c, i) => (
          <Fragment key={c.rotulo}>
            {i > 0 && (
              <span
                aria-hidden
                className="mx-2 self-center text-[0.55rem] text-ouro-escuro/60"
              >
                ✦
              </span>
            )}
            <div className="w-14 text-center">
              <span
                key={c.valor === undefined ? "x" : `${c.rotulo}-${c.valor}`}
                className={`vira block text-4xl font-medium tabular-nums ${
                  c.vivo ? "text-lacre" : "text-tinta"
                }`}
              >
                {c.valor === undefined ? "—" : String(c.valor).padStart(2, "0")}
              </span>
              <span className="mt-1 block text-[0.65rem] uppercase tracking-[0.3em] text-ouro-escuro">
                {c.rotulo}
              </span>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

/* ── Botão de confirmação com chuva de confetes ────────────────── */

type Confete = {
  dx: string;
  dySobe: string;
  dyCai: string;
  rot: string;
  dur: string;
  atraso: string;
  cor: string;
  raio: string;
  larg: number;
  alt: number;
};

const CORES_CONFETE = ["#C9A45C", "#E8D5A8", "#6E1220", "#F4EDDE", "#8A6A32"];

function geraConfetes(): Confete[] {
  return Array.from({ length: 90 }, (_, i) => {
    const larg = 6 + Math.random() * 5;
    return {
      dx: `${(Math.random() - 0.5) * 460}px`,
      dySobe: `${-(50 + Math.random() * 260)}px`,
      dyCai: `${130 + Math.random() * 260}px`,
      rot: `${Math.random() * 840 - 420}deg`,
      dur: `${1.1 + Math.random() * 0.7}s`,
      atraso: `${Math.random() * 0.15}s`,
      cor: CORES_CONFETE[i % CORES_CONFETE.length],
      raio: Math.random() < 0.35 ? "50%" : "2px",
      larg,
      alt: larg * (0.9 + Math.random() * 0.8),
    };
  });
}

export function BotaoConfirmar({ href }: { href: string }) {
  const [confetes, setConfetes] = useState<Confete[] | null>(null);
  const [indo, setIndo] = useState(false);

  const confirmar = (e: React.MouseEvent) => {
    e.preventDefault();
    if (indo) return;
    setIndo(true);
    const semMovimento = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!semMovimento) setConfetes(geraConfetes());
    setTimeout(
      () => {
        window.location.href = href;
      },
      semMovimento ? 250 : 1600
    );
  };

  return (
    <div className="relative">
      {confetes && (
        <div aria-hidden className="absolute inset-0 z-10">
          {confetes.map((c, i) => (
            <span
              key={i}
              className="confete"
              style={
                {
                  "--dx": c.dx,
                  "--dy-sobe": c.dySobe,
                  "--dy-cai": c.dyCai,
                  "--rot": c.rot,
                  "--dur": c.dur,
                  "--atraso": c.atraso,
                  width: `${c.larg}px`,
                  height: `${c.alt}px`,
                  background: c.cor,
                  borderRadius: c.raio,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      )}

      <a
        href={href}
        onClick={confirmar}
        aria-live="polite"
        className="group relative flex min-h-14 w-full items-center justify-center overflow-hidden rounded-full bg-gradient-to-b from-[#7D1624] to-[#55101B] px-6 text-lg font-semibold text-champanhe shadow-[0_16px_28px_-12px_rgba(36,5,11,0.8)] ring-1 ring-ouro/50 transition-transform active:scale-[0.98]"
      >
        {/* filete dourado interno, como a moldura do cartão */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-[3px] rounded-full border border-ouro/35"
        />
        {/* brilho que varre no hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
        />
        <span aria-hidden className="mr-3 text-xs text-ouro">
          ✦
        </span>
        {indo ? "Nos vemos lá!" : "Confirmar presença"}
        <span aria-hidden className="ml-3 text-xs text-ouro">
          ✦
        </span>
      </a>
    </div>
  );
}

/* ── Botão de agenda (.ics) ────────────────────────────────────── */

function paraFormatoICS(data: Date) {
  return data.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

export function BotaoAgenda({
  titulo,
  descricao,
  endereco,
  inicioISO,
  duracaoHoras,
}: {
  titulo: string;
  descricao: string;
  endereco: string;
  inicioISO: string;
  duracaoHoras: number;
}) {
  const baixar = () => {
    const inicio = new Date(inicioISO);
    const fim = new Date(inicio.getTime() + duracaoHoras * 3_600_000);
    const escapa = (texto: string) => texto.replace(/([,;])/g, "\\$1");

    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//convite-julia//PT-BR",
      "BEGIN:VEVENT",
      `UID:${inicio.getTime()}@convite-julia`,
      `DTSTAMP:${paraFormatoICS(new Date())}`,
      `DTSTART:${paraFormatoICS(inicio)}`,
      `DTEND:${paraFormatoICS(fim)}`,
      `SUMMARY:${escapa(titulo)}`,
      `DESCRIPTION:${escapa(descricao)}`,
      `LOCATION:${escapa(endereco)}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "aniversario-julia.ics";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      type="button"
      onClick={baixar}
      className="flex min-h-12 items-center justify-center rounded-full border border-lacre/40 px-4 text-sm font-medium text-lacre transition-colors hover:border-lacre"
    >
      Adicionar à agenda
    </button>
  );
}
