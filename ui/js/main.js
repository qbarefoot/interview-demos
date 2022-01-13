const saveChanges = document.getElementById("saveChanges")
const addButton = document.getElementById("addButton")
const inputChoices = document.getElementById("inp")
const userLabel = document.getElementById("label")
const userChoices = document.getElementById("currentList")
const userDefault = document.getElementById("defaultchoice")
const userBox = document.getElementById("userCheckBox")
const deleteButton = document.getElementById("deleteButton")


function saveForm() {
    if (!userLabel.value) {
        alert("Label field is required!");
    } else if (!userDefault.value) {
        alert("Create a default!")
    } else {
        let optionLabels = []
        for (let currentOption of userChoices.options) {
            optionLabels.push(currentOption.label)
            
        }
        if (!optionLabels.includes(userDefault.value)){
            let defaultOption = document.createElement("option")
            defaultOption.text = userDefault.value;
            userChoices.add(defaultOption)
        }
        let choiceObject = {
            "label": userLabel.value,
            "default": userDefault.value,
            "required": userBox.checked,
            "choices": optionLabels
        }
        fetch("http://www.mocky.io/v2/566061f21200008e3aabd919", 
            {
            method: "POST",
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(choiceObject)
            }
        ).then(response => {
            console.log(response)
        })
    }
}

function clearForm() {
    userLabel.value = ""
    userDefault.value = ""
    inputChoices.value = ""
    while (userChoices.options.length > 0) {
        userChoices.remove(0);
    }
}

function addChoices() { 
    if (!inputChoices.value) {
        alert("Choice field is required!")
    } else if (userChoices.options.length >= 50){
        alert("Cannot exceed 50 values")
    } else {
        optionLabels = []
        for (let option of userChoices.options){
            optionLabels.push(option.label)
        }
        if (optionLabels.includes(inputChoices.value)){
            alert("No duplicate values")
        } else {
            let option = document.createElement("option");
            option.text = inputChoices.value;
            userChoices.add(option);
        }
    }
    inputChoices.value = ""
}

function deleteChoices() {
    let choiceIndex = userChoices.selectedIndex
    userChoices.remove(choiceIndex);
}

function sortAlphabetically() {
    optionsToSort = []
    for (let currentOption of userChoices.options) {
        optionsToSort.push(currentOption.label)
    }
    while (userChoices.options.length > 0) {
        userChoices.remove(0);
    }
    for (let currentOption of optionsToSort.sort()) {
        let option = document.createElement("option")
        option.text = currentOption
        userChoices.add(option)
    }
}

saveChanges.addEventListener("click", saveForm)
clearChanges.addEventListener("click", clearForm)
addButton.addEventListener("click", addChoices)
deleteButton.addEventListener("click", deleteChoices)
sortButton.addEventListener("click", sortAlphabetically)