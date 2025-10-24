const photoInput = document.getElementById('photoInput');
const captionInput = document.getElementById('captionInput');
const addPhotoBtn = document.getElementById('addPhoto');
const gallery = document.getElementById('gallery');
const clearBtn = document.getElementById('clearAlbum');

let photos = JSON.parse(localStorage.getItem('album')) || [];

function renderPhotos() {
    gallery.innerHTML = '';
    photos.forEach((photo, index) => {
        const div = document.createElement('div');
        div.classList.add('photo-card');
        div.innerHTML = `
            <img src="${photo.src}" alt="Foto ${index}">
            <p>${photo.caption}</p>
        `;
        gallery.appendChild(div);
    });
}

addPhotoBtn.addEventListener('click', () => {
    const file = photoInput.files[0];
    const caption = captionInput.value.trim();

    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            const newPhoto = { src: reader.result, caption: caption || 'Sem legenda 💕' };
            photos.push(newPhoto);
            localStorage.setItem('album', JSON.stringify(photos));
            renderPhotos();
            captionInput.value = '';
            photoInput.value = '';
        };
        reader.readAsDataURL(file);
    }
});

clearBtn.addEventListener('click', () => {
    if (confirm('Tem certeza que deseja apagar o álbum? 😢')) {
        localStorage.removeItem('album');
        photos = [];
        renderPhotos();
    }
});

renderPhotos();
