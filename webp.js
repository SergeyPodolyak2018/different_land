const imagemin = require('imagemin'),
    webp = require('imagemin-webp')
const outputFolder = './public/img/About/mobile/webp';
const produceWebP = async () => {
    await imagemin(['./public/img/About/mobile/*.png'], {
        destination: outputFolder,
        plugins: [
            webp({
                lossless: true
            })
        ]
    })
    console.log('PNGs processed')
    await imagemin(['./public/img/About/mobile/*.{jpg,jpeg}'], {
        destination: outputFolder,
        plugins: [
            webp({
                quality: 65
            })
        ]
    })
    console.log('JPGs and JPEGs processed')
}
produceWebP();
