const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild){
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if(showOption(option)){
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option){
    return option.requiredState == null || option.requiredState(state) ;
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0){
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id : 1,
        text: "The Inspector looks around the room with a cold eye. He's quite sure one of them is hiding something. But which one? ",
        options: [
            {
                text: "The young man with the limp",
                setState: {youngMan : true},
                nextText : 2
            },

            {
                text: "The lady. She's not what she seems.",
                setState: {lady : true},
                nextText: 3
            }
        ]
    },

    {
        id: 2,
        text: "The young man with the limp. He says he has a war wound but he's far too young. More likely, he fell from a high window or a balcony doing something he shouldn't. \n Something like murder, perhaps?",
        options: [
            {
             text: "How's the leg?",
             requiredState: (currentState) => currentState.youngMan,
             setState: {youngMan: false, theLeg: true},
             nextText: 4
            },
            {
                text: "I didn't catch your name.",
                requiredState: (currentState) => currentState.youngMan,
                setState: {lady: false, yourName: true},
                nextText: 5
            }
        ]
    },

    {
        id: 3,
        text: "The lady. Sometimes intuition is all you have to go on. The Inspector saunters over to her, and places a hand gently on her elbow. \n Mrs DeWinter. If I may call you that.",
        options: [
            {
             text: "I ask, because it isn't your name.",
             nextText: 6
            },
            {
                text: "Tell me about yourself.",
                // requiredState: (currentState) => currentState.youngMan,
                // setState: {youngMan: false, yourName: true},
                nextText: 6
            }
        ]
    },

    {
        id: 4,
        text: "How's the leg? the Inspector asks, casually. \n How d'you think? the boy replies, with a sullen smile \n The Inspector isn't fooled for a second.",
        options: [
            {
                text: "Restart",
                nextText: -1
            }
        ]
    },

    {
        id: 5,
        text: "I didn't catch your name, the Inspector begins.\n Cos I didn't give it, the boy answers, sullenly. Why should I? \n The Inspector isn't fooled for a second. ",        
        options: [
            {
                text: "Restart",
                nextText: -1
            }
        ]
    },

    {
        id: 6,
        text: "Congratulation! You finished the plot story!",
        options: [
            {
                text: "Restart",
                nextText: -1
            }
        ]
    }
    
]

startGame()