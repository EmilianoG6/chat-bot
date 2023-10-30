const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowTaylor = addKeyword('Taylor', {sensitive:true}).addAnswer(["Bienvenid@ swiftie", "list@ para probar tus conocimientos sobre la talentosa Taylor Swift"])
.addAnswer("Ingresa tu nombre en el siguiente formato Nombre+TS", {capture : true}, (ctx, {fallBack}) => {
    if(!ctx.body.includes('TS')){
        return fallBack()
    }
    console.log(ctx.body)
})
.addAnswer("LISTOOO")

/*
const msgAPI = async () {
    const config = {
        method: 'get'
        url: ''
        headers: {
            'Authorization' : ''
        }
    };

    const {data} = await axios(config).then((i) => i.data)
    return data.map(m => {{"HOLA"}})
}*/

const flowImg = addKeyword('Imagen', {sensitive:true}).addAnswer("El memingo de la semana es", {
    media: "https://www.sectormatematica.cl/chistes/complejos.jpg"
})

const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer(['📄 Aquí tenemos el flujo secundario'])

const flowDocs = addKeyword(['doc', 'documentacion', 'documentación']).addAnswer(
    [
        '📄 Aquí encontras las documentación recuerda que puedes mejorarla',
        'https://bot-whatsapp.netlify.app/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowTuto = addKeyword(['tutorial', 'tuto'], {sensitive:true}).addAnswer(
    [
        '🙌 Aquí encontras un ejemplo rapido',
        'https://bot-whatsapp.netlify.app/docs/example/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowGracias = addKeyword(['gracias', 'grac'], {sensitive:true}).addAnswer(
    [
        '🚀 Puedes aportar tu granito de arena a este proyecto',
        '[*opencollective*] https://opencollective.com/bot-whatsapp',
        '[*buymeacoffee*] https://www.buymeacoffee.com/leifermendez',
        '[*patreon*] https://www.patreon.com/leifermendez',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowDiscord = addKeyword(['discord'], { sensitive : true }).addAnswer(
    ['🤪 Únete al discord', 'https://link.codigoencasa.com/DISCORD', '\n*2* Para siguiente paso.'],
    null,
    null,
    [flowSecundario]
)

const flowString = addKeyword('a').addAnswer('Este mensaje envia tres botones', {
    buttons: [{ body: 'Boton 1' }, { body: 'Boton 2' }, { body: 'Boton 3' }],
})

const flowButtons = addKeyword(['botones', 'bot']).addAnswer("BOTONES AAAAA")
.addAnswer('Estos son los botones', {
    buttons:[
        {
            body: 'Taylor'
        },
        {
            body: 'docs'
        },
    ]
})

const flowPrincipal = addKeyword(['hola', 'ole', 'alo'], { sensitive : true})
    .addAnswer('🙌 Hola bienvenido a este *Crash Notify*')
    .addAnswer(
        [
            'Escribe\n',
            '👉 *botones* para que veas el besto menu',
            '👉 *doc* para ver la documentación',
            '👉 *gracias*  para ver la lista de videos',
            '👉 *discord* unirte al discord',

        ],
        null,
        null,
        [flowDocs, flowGracias, flowTuto, flowDiscord, flowButtons, flowImg, flowTaylor]
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal, flowButtons, flowString])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
