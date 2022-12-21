import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: 'code-davinci-002',
    prompt: req.body.input,
    max_tokens: 1000,
    temperature: 0.6,
  });
  const text = completion.data.choices[0].text;
  const formattedText = text
    .replace(/([.!?])\s*(?=[A-Z])/g, '$1\n')
    .replace(/^./, function (str) {
      return str.toUpperCase();
    });
  console.log(formattedText);
  res.status(200).json({ result: formattedText });
}

function generatePrompt(animal) {
  const capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  return `Suggest three names for an animal that is a superhero.

Animal: Cat
Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
Animal: Dog
Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
Animal: ${capitalizedAnimal}
Names:`;
}
