"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { useLanguage, useT } from "@/contexts/LanguageContext";
import { TRUSTPILOT_URL } from "@/lib/links";


const empresas = [
  "Briel Travel Agency",
  "Mercashop HGL",
  "WayLearn",
  "Dev3Pack",
  "Solana Fundation",
  "Cuban Bitcoin",
  "Asaas Brasil",
];

const reviews = [
  {
    name: "Marilin Martinez",
    country: "BR",
    title: "Son personas de confianza y trabajan con mucha rapidez",
    text: "Desde la primera operación me atendieron con mucha paciencia y claridad. Todo el proceso fue rápido, transparente y sin complicaciones. Lo que más valoro es la confianza que transmiten y la rapidez con la que ejecutan cada envío. Ya llevo varias operaciones con ellos y siempre cumplen exactamente como prometen.",
    date: "2025-12-24",
    stars: 5,
    initial: "M",
    color: "bg-pink-500",
  },
  {
    name: "Jose David Batista",
    country: "BR",
    title: "Rápida, confiable y segura",
    text: "La primera vez comencé con cierta desconfianza porque uno siempre duda al enviar dinero, pero desde el inicio fueron muy claros conmigo. Me explicaron todo el proceso, los tiempos y las tasas. Hasta hoy todo ha salido perfecto: rápido, seguro y sin errores. Ya se ha convertido en mi opción fija para enviar dinero.",
    date: "2026-03-06",
    stars: 5,
    initial: "J",
    color: "bg-indigo-500",
  },
  {
    name: "Natalia Andrade",
    country: "CU",
    title: "Llegó todo impecable y en tiempo",
    text: "Compré varios productos para mi familia y la experiencia fue excelente. El seguimiento fue constante y siempre me mantuvieron informada de cada paso. Todo llegó completo, en buen estado y dentro del tiempo estimado. Se nota que tienen organización y responsabilidad.",
    date: "2026-04-14",
    stars: 5,
    initial: "N",
    color: "bg-emerald-500",
  },
  {
    name: "Andrés Pérez",
    country: "BR",
    title: "Servicio muy profesional y transparente",
    text: "Lo que más me gustó fue la claridad con los precios y la rapidez de respuesta. Desde la cotización hasta la confirmación del servicio todo fue muy profesional. Me dieron seguimiento constante y respondieron cada duda en tiempo real. Es difícil encontrar ese nivel de atención hoy en día.",
    date: "2026-04-18",
    stars: 5,
    initial: "A",
    color: "bg-cyan-500",
  },
  {
    name: "Clara Gómez",
    country: "CU",
    title: "Comprar pasajes nunca fue tan fácil",
    text: "Necesitaba resolver un viaje urgente y todo el proceso fue increíblemente rápido. Desde mi móvil hice todo y en cuestión de minutos tenía la reserva confirmada. Además me ayudaron con detalles importantes que yo desconocía. Muy recomendable para quien necesite rapidez.",
    date: "2026-04-22",
    stars: 5,
    initial: "C",
    color: "bg-fuchsia-500",
  },
  {
    name: "Rodrigo Silva",
    country: "BR",
    title: "Muy buenos precios y excelente soporte",
    text: "Comparé varias opciones antes de decidirme y Kawi fue la más clara con sus tarifas. No hubo costos ocultos ni cambios inesperados. Además el soporte respondió rápido cada vez que necesité ayuda. La combinación entre buen precio y buena atención marca mucha diferencia.",
    date: "2026-04-28",
    stars: 5,
    initial: "R",
    color: "bg-orange-500",
  },
  {
    name: "María Estévez",
    country: "CU",
    title: "Entrega rápida, segura y organizada",
    text: "La experiencia fue excelente desde el inicio. El equipo estuvo pendiente de cada detalle y me mantuvieron informada en todo momento. La entrega se hizo más rápido de lo que esperaba y todo llegó correctamente. Sin dudas repetiré con ellos.",
    date: "2026-05-01",
    stars: 5,
    initial: "M",
    color: "bg-rose-500",
  },
  {
    name: "Fernando Cruz",
    country: "BR",
    title: "Proceso impecable de principio a fin",
    text: "Desde la primera cotización sentí que todo estaba bien estructurado. La comunicación fue clara, el proceso sencillo y la confirmación rápida. Todo se sintió profesional y seguro. Es de esas plataformas que generan confianza desde el primer contacto.",
    date: "2026-05-05",
    stars: 5,
    initial: "F",
    color: "bg-sky-500",
  },
  {
    name: "Sofía Ramos",
    country: "CU",
    title: "Atención rápida y muy humana",
    text: "Tenía muchas dudas antes de hacer la operación y me respondieron absolutamente todo con paciencia. Me guiaron paso a paso hasta terminar el proceso y eso me dio mucha tranquilidad. Se nota que entienden bien las necesidades de quienes estamos lejos de nuestra familia.",
    date: "2026-05-09",
    stars: 5,
    initial: "S",
    color: "bg-violet-500",
  },
  {
    name: "Lucas Duarte",
    country: "BR",
    title: "Confianza total para operar",
    text: "Ya he usado el servicio varias veces y siempre ha funcionado perfectamente. Los tiempos de respuesta son rápidos, la atención es buena y el proceso es simple. Hoy en día eso vale mucho. Lo recomiendo especialmente para quienes necesitan enviar dinero o gestionar servicios hacia Cuba.",
    date: "2026-05-13",
    stars: 5,
    initial: "L",
    color: "bg-lime-500",
  },
  {
    name: "Ana Belén",
    country: "CU",
    title: "Muy útil y con excelente acompañamiento",
    text: "No solo me ayudaron con la reserva, también me orientaron con varios documentos y requisitos que yo no tenía claros. Eso hizo que todo fuera mucho más fácil y rápido. El servicio es muy completo y el acompañamiento durante todo el proceso hace mucha diferencia.",
    date: "2026-05-17",
    stars: 5,
    initial: "A",
    color: "bg-amber-500",
  },
];

const StarRating = ({ count }: { count: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-green-500 text-green-500" />
    ))}
  </div>
);

const TestimonialsSection = () => {
  const { lang } = useLanguage();
  const t = useT();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % reviews.length);
        setIsAnimating(false);
      }, 300);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const activeReview = reviews[activeIndex];
  const translated = t.reviews.items[activeIndex];
  const activeTitle = translated?.title ?? activeReview.title;
  const activeText = translated?.text ?? activeReview.text;
  const localeMap: Record<string, string> = { en: "en-US", es: "es-ES", pt: "pt-BR" };
  const formattedDate = new Date(activeReview.date).toLocaleDateString(localeMap[lang], { day: "numeric", month: "long", year: "numeric" });

  const metric = `${activeReview.stars} ${t.reviews.starsSuffix}`;

  return (
    <section id="reviews" className="relative py-32 lg:py-40 border-t border-foreground/10 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Encabezado con etiqueta y contador */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            {t.reviews.eyebrow}
          </span>
          <div className="flex-1 h-px bg-foreground/10" />
          <span className="font-mono text-xs text-muted-foreground">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(reviews.length).padStart(2, "0")}
          </span>
        </div>

        {/* Contenido principal: cita + autor + métrica */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-8">
            <blockquote
              className={`transition-all duration-300 ${
                isAnimating
                  ? "opacity-0 translate-y-4"
                  : "opacity-100 translate-y-0"
              }`}
            >
              <p className="text-primary font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-foreground">
                “{activeTitle}”
              </p>
              <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
                {activeText}
              </p>
            </blockquote>

            {/* Autor */}
            <div
              className={`mt-12 flex items-center gap-6 transition-all duration-300 delay-100 ${
                isAnimating ? "opacity-0" : "opacity-100"
              }`}
            >
              <div
                className={`w-16 h-16 rounded-full ${activeReview.color} flex items-center justify-center text-white font-bold text-2xl`}
              >
                {activeReview.initial}
              </div>
              <div>
                <p className="text-lg font-medium text-foreground">
                  {activeReview.name}
                </p>
                <p className="text-muted-foreground">
                  {activeReview.country === "BR" ? t.reviews.countries.BR : t.reviews.countries.CU} ·{" "}
                  {formattedDate}
                </p>
                <StarRating count={activeReview.stars} />
              </div>
            </div>
          </div>

          {/* Métrica destacada + puntos de navegación */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <div
              className={`p-8 border border-foreground/10 transition-all duration-300 ${
                isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
              }`}
            >
              <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase block mb-4">
                {t.reviews.rating}
              </span>
              <p className="font-display text-3xl md:text-4xl text-foreground">
                {metric}
              </p>
              <StarRating count={5} />
            </div>

            {/* Puntos de navegación */}
            <div className="flex gap-2 mt-8">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsAnimating(true);
                    setTimeout(() => {
                      setActiveIndex(idx);
                      setIsAnimating(false);
                    }, 300);
                  }}
                  className={`h-2 transition-all duration-300 ${
                    idx === activeIndex
                      ? "w-8 bg-primary"
                      : "w-2 bg-foreground/20 hover:bg-foreground/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Marquesina de nombres de clientes (en lugar de empresas) */}
        <div className="mt-24 pt-12 border-t border-foreground/10">
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase mb-8 text-center">
            {t.reviews.companies}
          </p>
        </div>
      </div>

      {/* Marquesina a pantalla completa */}
      <div
        style={{
          width: "100%",
          overflow: "hidden",
          position: "relative",
          border: "1px solid rgba(1,1,1,0.05)",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "4rem",
            alignItems: "center",
            whiteSpace: "nowrap",
            width: "max-content",
            animation: "marquee 35s linear infinite",
          }}
        >
          {empresas.map((_, setIdx) => (
            <div
              key={setIdx}
              style={{
                display: "flex",
                gap: "4rem",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              {empresas.map((review) => (
                <span
                  key={`${setIdx}-${review}`}
                  style={{
                    fontSize: "clamp(1.25rem, 2vw, 2rem)",
                    fontWeight: 500,
                    opacity: 0.3,
                    cursor: "pointer",
                    transition: "opacity 300ms ease, transform 300ms ease",
                    display: "inline-block",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "1";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "0.3";
                    e.currentTarget.style.transform = "translateY(0px)";
                  }}
                >
                  {review}
                </span>
              ))}
            </div>
          ))}
        </div>

        <style>{`
          @keyframes marquee {
            from {
              transform: translateX(0%);
            }
            to {
              transform: translateX(-50%);
            }
          }
        `}</style>
      </div>

      <div className="text-center mt-16">
        <a
          href={TRUSTPILOT_URL}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary/30"
        >
          {t.reviews.cta}
        </a>
      </div>
    </section>
  );
};

export default TestimonialsSection;
