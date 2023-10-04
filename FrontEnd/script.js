//const apiURL = 'http://localhost:3000/directoryToTree';   //LOCAL
const apiURL = 'https://nodeone.armandonava.repl.co/directoryToTree';     //REMOTE

// Componente para representar un nodo del árbol (carpeta o archivo)
Vue.component('tree-node', {
    props: ['node'],
    template: `
        <div>
            <div @click="toggleNode" :class="{'folder': node.type === 'dir'}">
                <img v-if="node.type === 'dir'" class="folder-icon" src="img/folder.png" alt="Folder Icon">
                <span v-if="node.type === 'dir'">
                    <span class="spacer"></span>
                    {{ isOpen ? '-' : '+' }}
                </span>
                <img v-if="node.type === 'file'" class="file-icon" src="img/file.png" alt="File Icon">
                {{ node.name }}
            </div>
            <div v-if="isOpen">
                <tree-node v-for="child in node.children" :key="child.name" :node="child" style="margin-left:10px"></tree-node>
            </div>
        </div>
    `,
    data() {
        return {
            isOpen: false
        };
    },
    methods: {
        toggleNode() {
            if (this.node.type === 'dir') {
                this.isOpen = !this.isOpen;
            }
            selectElement(this.node.path, this.node.name, this.node.type, this.node.size);
        }
    }
});

// Componente para la tabla del árbol
Vue.component('tree-table', {
    props: ['data'],
    template: `
        <div>
            <div v-for="node in data" :key="node.name">
                <tree-node :node="node"></tree-node>
            </div>
        </div>
    `
});

var myApp = new Vue({
    el: '#app',
    data: {
        treeData: []
    }
});

function handleData(response) {

    console.log("THE RESPONSE:" + response);
    console.log("myApp.treeData:" + myApp.treeData);
    myApp.treeData = Array(1).fill(response);

    cleanCardElementoSeleccionado();
}

function handleError(err) {

    console.log(err);
    console.log(err.stack);
}

function directoryToTree(directory, depth) {

    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: '{"rootPath":"' + directory + '","maxDepth":' + depth + '}'
      };
      
    fetch(apiURL, options)
        .then(response => response.json())
        .then(response => handleData(response))
        .catch(err => handleError(err));
}

function runTestCase(num) {

    if(num == "1")
        directoryToTree('dummy_dir/a_dir', 5);
    
    if(num == "2")
        directoryToTree('dummy_dir', 5);
    
    if(num == "3")
        directoryToTree('dummy_dir', 1);
        
    if(num == "4")
        directoryToTree('dummy_dir', 0);
    
    if(num == "5")
        directoryToTree('linux-distros', 0);
    
    if(num == "6")
        directoryToTree('linux-distros', 1);
    
    if(num == "7")
        directoryToTree('linux-distros', 2);
        
    if(num == "8")
        directoryToTree('linux-distros', 3);

}

function selectElement(path, name, type, size) {
 
    document.getElementById('cardElementoSeleccionado').style.display = '';

    document.getElementById('pathLabel').innerHTML = path;
    document.getElementById('nameLabel').innerHTML = name;
    document.getElementById('typeLabel').innerHTML = type;
    document.getElementById('sizeLabel').innerHTML = size;
}

function cleanCardElementoSeleccionado() {

    document.getElementById('cardElementoSeleccionado').style.display = 'none';
    document.getElementById('pathLabel').innerHTML = '';
    document.getElementById('nameLabel').innerHTML = '';
    document.getElementById('typeLabel').innerHTML = '';
    document.getElementById('sizeLabel').innerHTML = '';
}