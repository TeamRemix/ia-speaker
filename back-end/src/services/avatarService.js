const { GoogleGenerativeAI, SchemaType } = require('@google/generative-ai')

async function textGeneration(promptUser) {
  const genAI = new GoogleGenerativeAI(process.env.API_KEY)
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

  const prompt = "Hello, what is the used of curl command on linux"

  const result = await model.generateContent(prompt)

  console.log(result.response.text())
}

function other() {

}

async function responseWhitJson() {
  const genAI = new GoogleGenerativeAI("AIzaSyDbULGStYFijxB4pd0IkqKD-h3rxxjPyv4")
  const schema1 = {
    description: "Respose Speaker native",
    type: SchemaType.ARRAY,
    items: {
      type: SchemaType.OBJECT,
      properties: {
        recipeName: {
          type: SchemaType.STRING,
          description: "respose from speaker",
          nullable: false
        }
      },
      required: ["responseSpeaker"],
    }
  }

  const schema = {
    description: "speaker native",
    type: SchemaType.ARRAY,
    items: {
      type: SchemaType.OBJECT,
      properties: {
        recipeName: {
          type: SchemaType.STRING,
          description: "Reponse speaker",
          nullable: false,
        },
      },
      required: ["speakerResponse"],
    },
  };
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  })
  const promt = `Rol: Eres un hablante nativo de ingles 
                Mensage : Hello my name is Ralf, i'm tring learn english
                
                Responde utilizando este JSON schema:
                result: {'reponse': string}
                Return : Array<result>`
  let result = await model.generateContent(promt)

  console.log(result.response.text())
}

async function contentStream() {
  const genAI = new GoogleGenerativeAI("AIzaSyDbULGStYFijxB4pd0IkqKD-h3rxxjPyv4")
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

  const promt = 'Hello tell me how make a github repo'

  const result = await model.generateContentStream(promt)

  let text = ''

  for await (const chuck of result.stream) {
    const chuckText = chuck.text()
    console.log(chuckText)
    text += chuckText
  }
}
//responseWhitJson()
//contentStream()

module.exports = {
  textGeneration,
  other
}
