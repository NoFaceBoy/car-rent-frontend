import axios from "axios";


async function receiveFiltered(params) {
    let res = await axios.get("/api/cars").then((resposnse) => resposnse.data);
    console.log(res);
    return res;
}

async function receiveById(id) {
    let res = await axios.get("/api/cars/" + id).then(response => response.data);
    return res;
}

async function receiveImage(id, again = false) {
    let res = await axios.get("/api/cars/image/" + id, { responseType: 'blob' }).then((resposnse) => resposnse.data).catch(async err =>{
        console.log(err);
        if(again){
            return "";
        }else {
            return await receiveImage(id, true);
        }
    });
    const image = URL.createObjectURL(res);
    console.log(image);

    return image;
}

async function loadMainImageFor(list) {
    await Promise.all(list.map(elem => {
        if (!elem.hasOwnProperty('imageUrls')) {
            return receiveImage(elem.id).then(val => elem.imageUrls = [val]);
        }
        return Promise.resolve();
    }));
    return;
}

async function loadAllImagesFor(elem){
    let listToLoad = [elem.id];
    if(elem.hasOwnProperty('imageUrls')){
        if(elem.imageIds.length === elem.imageUrls.length){
            return;
        } else {
            listToLoad.shift();
        }
    } else {
        elem.imageUrls = [];
    }
    
    let loaded = [];
    await Promise.all(listToLoad.map(async (elem, index) => {
        let url = await receiveImage(elem);
        loaded[index] = url;
    }));

    elem.imageUrls = elem.imageUrls.concat(loaded);
}

export async function loadAllById(id) {
    let res = await receiveById(id);
    await loadAllImagesFor(res);
    return res;
}

export async function loadMainByFilter (param) {
    let res = await receiveFiltered(param);
    await loadMainImageFor(res);
    return res;
}