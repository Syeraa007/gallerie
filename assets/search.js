const API_KEY = "6XHVdCz4aIKEIcfCdp1M7SUXDgDFSWbcz-Ex1xRol14"

function convert_to_json(data){
    return data.json();
}

window.onload = function(){
    const location = window.location.href;
    const url = new URL(location);
    const search_params = new URLSearchParams(url.search);
    
    if(!search_params.has('q') || search_params.get('q') == ""){
        window.location.href = './';
    }
    
    fetch(`https://api.unsplash.com/search/photos?per_page=30&query=${search_params.get('q')}&client_id=${API_KEY}`).then(convert_to_json).then(function (data){
        // generateCards(data); //object
        generateCards(data.results);

        document.getElementsByName('q')[0].value = search_params.get('q');
        document.getElementById('search_query').innerHTML = search_params.get('q');
        // document.getElementById('image_id').innerHTML = search_params.get('q');
    });

};

function generateCards(data){
    console.log(data);
    const container = document.getElementById('result_container');
    for(let i = 0; i < data.length; i++){
        const single_item = data[i];
        const card        = document.createElement('div');
        const anchor      = document.createElement('a');
        const image       = document.createElement('img');
        
        card.classList.add('item');
        anchor.href = `detail.html?id=${single_item.id}`;
        card.style.backgroundColor = single_item.color;
        image.src = single_item.urls.thumb;
        
        anchor.appendChild(image);
        card.appendChild(anchor);
        container.appendChild(card);
    }
}