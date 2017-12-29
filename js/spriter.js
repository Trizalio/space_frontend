


let bmd = null;
function generateTexture (game, key, data, pixelWidth, pixelHeight, callback, callbackContext) {

    if (pixelWidth === undefined) { pixelWidth = 8; }
    if (pixelHeight === undefined) { pixelHeight = pixelWidth; }

    let w = data[0].length * pixelWidth;
    let h = data.length * pixelHeight;

    if (bmd === null)
    {
        bmd = game.make.bitmapData();
    }
    let canvas = bmd.canvas;
    let ctx = bmd.context;

    bmd.resize(w, h);
    bmd.clear();

    //  Draw it
    for (let y = 0; y < data.length; y++)
    {
        let row = data[y];

        for (let x = 0; x < row.length; x++)
        {
            let d = row[x];
            if (d)
            {
            	ctx.fillStyle = 'rgb(' + d.r + ',' + d.g + ',' + d.b + ')';
            	// ctx.fillStyle = 'rgba(' + d.r + ',' + d.g + ',' + d.b + ',' + d.a + ')';
            	ctx.fillRect(x * pixelWidth, y * pixelHeight, pixelWidth, pixelHeight);
            	
            }
        }
    }

    return bmd.generateTexture(key, callback, callbackContext);

}

console.log('spriter loaded');