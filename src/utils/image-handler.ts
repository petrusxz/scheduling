export function imageHandler(image: ArrayBuffer): string {
    if (!image) { return ''; }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    const resizeImg = () => {
        canvas.height = canvas.width * (img.height / img.width);

        const oc = document.createElement('canvas');
        const octx = oc.getContext('2d');

        oc.width = img.width * 0.5;
        oc.height = img.height * 0.5;

        octx.drawImage(img, 0, 0, oc.width, oc.height);
        octx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5);

        ctx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5, 0, 0, canvas.width, canvas.height);
    }

    img.onload = resizeImg;

    const bytes = new Uint8Array(image);
    const blob = new Blob([bytes]);

    img.src = URL.createObjectURL(blob);

    return img.src;
}