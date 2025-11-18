// Custom cursor für alle Seiten
const cursor = document.querySelector(".custom-cursor");

if (cursor) {
    document.addEventListener("mousemove", e => {
        cursor.style.top = e.clientY + "px";
        cursor.style.left = e.clientX + "px";
    });
}