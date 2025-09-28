export const validateForm = (form) => {
    try {
        let isValid = true;

        Array.from(form.elements).forEach((element) => {
            if (element) {
                const htmlElement = element

                if (htmlElement?.required && !htmlElement.value) {
                    isValid = false;
                    if (htmlElement.type === "file") {
                        const fileInput = document.getElementById(
                            `${htmlElement.id}`
                        );
                        fileInput.classList.add("border-red-600");
                    } else {
                        htmlElement.classList.add("border-red-600");
                    }
                } else {
                    if (htmlElement.type === "file") {
                        const fileInput = document.getElementById(
                            `${htmlElement.id}`
                        );
                        fileInput.classList.remove("border-red-600");
                    } else {
                        htmlElement.classList.remove("border-red-600");
                    }
                }
            }
        });

        return isValid;
    } catch (err) {
        return false;
    }
};