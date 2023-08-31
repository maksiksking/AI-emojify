import json
import time
from js import localStorage, document, console, XMLHttpRequest

testDiv = document.getElementById("test")


def passTxt():
    time.sleep(1)
    from js import thePrompt
    testDiv.innerHTML = thePrompt

    bearer = "Bearer " + localStorage.getItem("openAI")

    promptDiv = document.getElementById("prompt")
    # prompt = "list three colors"
    promptDiv.innerHTML = "<h3>Prompt: </h3>\"" + thePrompt + "\"<hr/>"

    engine = "text-davinci-003"

    xhr = XMLHttpRequest.new()
    xhr.open("POST", "https://api.openai.com/v1/completions", False)
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.setRequestHeader("Authorization", bearer)

    theNeatPrompt = f'You are a program that converts text into emoji. You are not permitted to use text characters. Do not write any text, just emojies. Again, you are not permitted to use any characters other than emoji even for comment. \n For example: "Crab ate a sock an appeared on an island in India under green sun" you convert it to "🦀🍽️🧦🏝️🇮🇳🌞" \n Now turn this into emoji: {thePrompt}'

    data = json.dumps({
        "model": engine,
        "prompt": theNeatPrompt,
        "max_tokens": 1000,
        "temperature": 0.3,
        "top_p": 0.3,
        "frequency_penalty": 1.2,
        "presence_penalty": 1
    })

    xhr.send(data)

    json_response = json.loads(xhr.response)
    completion_text = json_response['choices'][0]['text']
    console.log("Colors: " + completion_text)

    completionDiv = document.getElementById("completion")
    completionDiv.innerHTML = "<h3>OpenAI (" + engine + ") Response: </h3>\"" + completion_text.strip() + "\""