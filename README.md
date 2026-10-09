# 💕 Para Mi Amor

Web romántica interactiva pensada para celular.

## Cómo usarla

No necesita servidor para probar la mayoría de las funciones:

1. Abrí `index.html` en un navegador.
2. Para publicarla gratis, subí todos los archivos a un repositorio de GitHub.
3. Activá **GitHub Pages** desde Settings → Pages.
4. Compartí el enlace con tu novia.

## Personalización

El archivo principal para editar los juegos es `script.js`.

También podés cambiar:
- Nombre y mensajes en `index.html`
- Colores, tipografías y diseño en `style.css`
- Preguntas y respuestas en `script.js`
- Actividades de la ruleta en `script.js`

## Fotos

Podemos agregar una galería con fotos de ustedes en una próxima versión. Colocá las imágenes dentro de `assets/` y se pueden incorporar al diseño.

## PWA

Incluye `manifest.json` y `sw.js`, por lo que está preparada para convertirse en una web instalable desde navegadores compatibles cuando esté publicada por HTTPS.


## 📸 Imágenes que tenés que reemplazar

Dentro de `assets/` dejé archivos con estos nombres:

- `pug.png` → foto del pug que querés en la esquina.
- `salchicha.png` → foto del perro salchicha.
- `memoria1.jpg` ... `memoria8.jpg` → 8 fotos de ustedes. Cada foto aparece dos veces en el juego para formar las parejas.
- `foto_de_rompecabezas.jpg` → la foto que quieras usar para el rompecabezas. Puede ser una foto de ustedes, un animal, etc.

Podés reemplazar esos archivos manteniendo exactamente el mismo nombre.

## 🐱 Minijuego final

La sorpresa final ahora es un minijuego 2D: el personaje debe saltar obstáculos hasta llegar al gato naranja. Se puede jugar tocando **Saltar** o usando la barra espaciadora/flecha arriba en PC.
