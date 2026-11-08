# AI-901 Prep Lab

Aplicación web para preparar la certificación **Microsoft AI-901: Azure AI Fundamentals** (*Introduction to AI in Azure*).
Contenido bilingüe (español / inglés) basado en el temario oficial *Skills measured as of April 15, 2026*.

## Funcionalidades

- **Panel**: nota de preparación estimada sobre 1000 (ponderada por el peso de cada dominio), acierto por tema, flashcards dominadas, fallos pendientes e historial de simulacros.
- **Teoría**: resumen de los 7 bloques del temario con ejemplos de código Python (Foundry SDK, agentes, Azure Speech, Azure Language, Content Understanding).
- **Flashcards**: 35 tarjetas filtrables por tema, con marca de "dominada".
- **Práctica**: 60 preguntas con explicación inmediata; prioriza las no vistas y las falladas.
- **Simulacro**: 40 preguntas con el reparto real de dominios (D1 40–45 %, D2 55–60 %), 45 minutos, nota sobre 1000 y revisión final.
- **Fallos**: preguntas cuya última respuesta fue incorrecta, para repasarlas.

## Temario cubierto

| Dominio | Peso | Temas |
|---|---|---|
| D1 · Identify AI concepts and capabilities | 40–45 % | IA responsable · Modelos y configuración · Cargas de trabajo de IA |
| D2 · Implement AI solutions by using Microsoft Foundry | 55–60 % | Apps y agentes generativos · Texto y voz · Visión e imágenes · Content Understanding |

## Uso

No necesita instalación ni dependencias: es HTML, CSS y JavaScript sin framework.

```bash
git clone https://github.com/agustinlinares/ai901-prep-lab.git
cd ai901-prep-lab
# abre index.html en el navegador, o sirve la carpeta:
npx serve .
```

El progreso se guarda en el `localStorage` del navegador.

## Estructura

```
ai901-prep-lab/
├── index.html      # estructura de la página
├── css/styles.css  # estilos (modo claro y oscuro)
└── js/
    ├── data.js     # temario, teoría, flashcards y banco de preguntas
    └── app.js      # lógica: navegación, práctica, simulacro, progreso
```

Para añadir preguntas, edita `QS` en `js/data.js`. Cada pregunta tiene `id`, tema `t`, enunciado `q`, opciones `o`, índices correctos `a` (dos o más = "elige dos") y explicación `e`, con textos `{es, en}`.

## Publicar en GitHub Pages

Settings → Pages → Source: *Deploy from a branch* → rama `main`, carpeta `/ (root)`.

## Autor

Agustín Linares Carrera

> La nota del simulacro es orientativa: Microsoft usa una puntuación escalada.
