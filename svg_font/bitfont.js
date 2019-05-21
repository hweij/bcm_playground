let canvas = document.getElementById("cvOutput");
let context = canvas.getContext("2d");

// context.rect(20, 20, 150, 100);
// context.stroke();

function printText(ctx, w, h, s) {
    const cell_width = 4;
    const cell_height = 4;
    let imageData = ctx.getImageData(0, 0, w, h);
    let data = imageData.data;
    let row = 0;
    let col = 0;

    function fillDot(bx, by, color) {
        for (let dy = 0; dy < cell_height; dy++) {
            let addr = (by * w + bx) * 4;
            let dx;
            for (dx = 0; dx < (cell_width * 4); dx += 4) {
                data[addr + dx + 0] = color;
                data[addr + dx + 1] = color;
                data[addr + dx + 2] = color;
                data[addr + dx + 3] = 0xff;
            }
            // data[addr + dx + 0] = 0xff;
            // data[addr + dx + 1] = 0xff;
            // data[addr + dx + 2] = 0xff;
            // data[addr + dx + 3] = 0xff;
            by++;
        }
    }

    for (let i = 0; i < s.length; i++) {
        let c = s.charCodeAt(i);
        if (c == 10) {
            col = 0;
            row++;
            console.log("ENTER");
        }
        else {
            console.log(c);
            let space = false;
            switch (c) {
                case 32:
                    c = 0;
                    space = true;
                    break;
            }
            // Bit pattern
            let by = row * cell_height * 6;
            let bx = col * cell_width;
            for (let bi = 0; bi < 5; bi++) {
                let color;
                if (space) {
                    color = 0xff;
                }
                else {
                    if (c & 1) {
                        color = 0x00;
                    }
                    else {
                        color = 0xdd;
                    }    
                }
                // Draw the dot
                fillDot(bx, by, color);
                by += cell_height;
                c = c >> 1;
            }
            col++
        }
    }

    console.log("Putting image");
    ctx.putImageData(imageData, 0, 0);
}

printText(context, canvas.width, canvas.height,
`Filler text is text that shares some characteristics
of a real written text, but is random or otherwise generated.
It may be used to display a sample of fonts, generate text
for testing, or to spoof an e-mail spam filter.
The process of using filler text is sometimes called greeking,
although the text itself may be nonsense, or largely Latin,
as in Lorem ipsum.`);