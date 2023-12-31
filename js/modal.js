const galeryBoxes = document.querySelectorAll(".galery-img")
const bodyModal = document.querySelector("body")
const modal = document.querySelector(".modal")
const images = document.querySelectorAll(".galery-box>.galery-img> img")
let modalImage = document.querySelector(".modal-img>img")
const closeIcon = document.querySelector(".close-icon")
const downloadIcon = document.querySelector(".download-icon")
const arrowLeft = document.querySelector(".fa-chevron-left")
const arrowRight = document.querySelector(".fa-chevron-right")
const loader = document.querySelectorAll(".loader")
let currentImageIndex = 0;


const hideModal = () => {
    modal.style.display = "none"
    bodyModal.classList.remove("modal-box")
}

const downloadImages = () => {
    const downloadLink = document.createElement('a');
    downloadLink.href = modalImage.src;
    downloadLink.download = modalImage.src;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}
const findIndex = () => {
    for (let i = 0; i < images.length; i++) {

        if (modalImage.src === images[i].src) {
            return i;
            break
        }
    }
}

function showNextImage() {
    currentImageIndex = findIndex()

    modalImage.src = images[currentImageIndex + 1].src

    if (images[currentImageIndex] === images[images.length - 2]) {
        arrowRight.style.display = "none"
    }
    else {
        arrowLeft.style.display = "block"
    }
}

function showPreviousImage() {
    currentImageIndex = findIndex()

    modalImage.src = images[currentImageIndex - 1].src

    if (images[currentImageIndex] === images[1]) {
        arrowLeft.style.display = "none"
    }
    else {
        arrowRight.style.display = "block"
    }
}

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        hideModal();
    }
});
images.forEach(img => {
    img.addEventListener("load", function () {
        img.style.opacity = 1;
        const currentImageIndex = Array.from(images).indexOf(img);
        loader[currentImageIndex].classList.add("hide");

    })
    if (img.complete) {
        img.style.opacity = 1;
        const currentImageIndex = Array.from(images).indexOf(img);
        loader[currentImageIndex].classList.add("hide");
    }
    img.addEventListener('click', function (e) {
        modalImage.src = e.currentTarget.src;
        if (modalImage.src === images[images.length - 1].src) {
            arrowRight.style.display = "none"
            arrowLeft.style.display = "block"
        }
        else if (modalImage.src === images[0].src) {
            arrowLeft.style.display = "none"
            arrowRight.style.display = "block"
        }
        else {
            arrowLeft.style.display = "block"
            arrowRight.style.display = "block"

        }
        modal.style.display = "flex"
        modal.classList.add = "test"
        bodyModal.classList.add("modal-box")
    })
})


closeIcon.addEventListener("click", hideModal)
downloadIcon.addEventListener("click", downloadImages)
arrowRight.addEventListener('click', showNextImage)
arrowLeft.addEventListener('click', showPreviousImage)
modal.addEventListener('click', e => {
    if (e.target !== arrowLeft && e.target !== arrowRight && e.target !== downloadIcon && e.target !== modalImage) {
        hideModal();
    }
})
