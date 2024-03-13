// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const formRef = document.querySelector(".form");

formRef.addEventListener("submit", function (event) {
    event.preventDefault();
    const timer = event.currentTarget.elements.delay.value;
    const radio = event.currentTarget.elements.state.value;

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (radio==="fulfilled") {
                resolve();
            } else {
                reject();
            }
        }, timer);
    });
    promise.then(value => {
        iziToast.success({
            position: "topRight",
            message: `✅ Fulfilled promise in ${timer}ms`,
        });
    })
        .catch(error => {
            iziToast.error({
                position: "topRight",
                message: `❌ Rejected promise in ${timer}ms`,
            });
        })
});
   