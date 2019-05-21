let canvas = document.getElementById("cvOutput");
let context = canvas.getContext("2d");

// context.rect(20, 20, 150, 100);
// context.stroke();

const format2 = {
    colors: [[0xdd,0xdd,0xdd],[0,0,0]],
    numbits: 1,
    numlines: 5
};
const format8 = {
    colors: [[0,0,0],[0xff,0,0],[0,0xff,0],[0,0,0xff],[0x77,0x77,0],[0x77,0,0x77],[0,0x77,0x77],[0xdd, 0xdd, 0xdd]],
    numbits: 3,
    numlines: 2
}

function printText(ctx, w, h, s, format, cw, ch) {
    const numbits = format.numbits;
    const numlines = format.numlines;
    const bitmask = (1 << numbits) - 1;
    const cell_width = cw;
    const cell_height = ch;
    let imageData = ctx.getImageData(0, 0, w, h);
    let data = imageData.data;
    let row = 0;
    let col = 0;

    function fillDot(bx, by, color) {
        for (let dy = 0; dy < cell_height; dy++) {
            let addr = (by * w + bx) * 4;
            for (let dx = 0; dx < (cell_width * 4); dx += 4) {
                data[addr + dx + 0] = color[0];
                data[addr + dx + 1] = color[1];
                data[addr + dx + 2] = color[2];
                data[addr + dx + 3] = 0xff;
            }
            by++;
        }
    }

    for (let i = 0; i < s.length; i++) {
        let c = s.charCodeAt(i);
        if (c == 10) {
            col = 0;
            row++;
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
            let by = row * cell_height * (numlines + 1);
            let bx = col * cell_width;
            for (let bi = 0; bi < numlines; bi++) {
                let color;
                if (space) {
                    color = [0xff, 0xff, 0xff];
                }
                else {
                    let m = c & bitmask;
                    color = format.colors[m];
                }
                // Draw the dot
                fillDot(bx, by, color);
                by += cell_height;
                c = c >> numbits;
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
as in Lorem ipsum.`, format2, 4, 4);