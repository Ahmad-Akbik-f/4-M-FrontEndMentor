let tskContainer = document.querySelector('.tasks')
let tasks = document.querySelectorAll('.tasks .tsk')
let tCnt = document.querySelector('.tskNum')
let inp = document.querySelector('input')
let clearBtn = document.querySelector('.listing .cls')
let ul = document.querySelectorAll('ul li')
let done = 0;
let arrEle = []

//Start Theme
let sBtn = document.querySelector('.txt .sBtn')
sBtn.onclick = ()=>{
    if(!document.body.classList.contains('dark')){
        document.body.classList.add('dark')
        document.body.classList.remove('light')
    }else{
        document.body.classList.remove('dark')
        document.body.classList.add('light')
    }
}
//End Theme

window.addEventListener('keydown' , (el)=>{
    if(inp.value.trim()!="" && el.key == "Enter"){
        let newTsk = document.createElement('div')
        let nTskTxt = document.createElement('p')
        let nBtnTxt = document.createElement('button')
        nTskTxt.innerText = inp.value.trimEnd().trimStart()
        newTsk.classList.add('tsk')
        newTsk.setAttribute("draggable","true")
        nTskTxt.classList.add('tskTxt')
        nBtnTxt.classList.add('btn')
        newTsk.append(nTskTxt)
        newTsk.append(nBtnTxt)
        tskContainer.append(newTsk)
        arrEle.push(newTsk)
        inp.value = ""
        nBtnTxt.addEventListener('click', (el , i)=>{
            nBtnTxt.classList.toggle('active')
            nTskTxt.classList.toggle('done')
            ul.forEach((el)=>{
                if(el.classList.contains('active') && el.classList.contains('act')){
                    newTsk.classList.add('none')
                }
                if(el.classList.contains('completed') && el.classList.contains('act')){
                    if(!nTskTxt.classList.contains('done')){
                        newTsk.classList.add('none')
                    }
                }
            })
            if(nBtnTxt.classList.contains('active')){
                done++
                tCnt.innerHTML = `${arrEle.length - done} tasks left`
            }else{
                if(done > 0){
                    done--
                }
                tCnt.innerHTML = `${arrEle.length - done} tasks left`
            }
        })
        tCnt.innerHTML = `${arrEle.length} tasks left`
        clearBtn.addEventListener('click' ,()=>{
            for (let i = 0; i < arrEle.length ; i++) {
                if(arrEle[i].children[0].classList.contains('done')){
                    arrEle.splice(i , 1)
                    if(done > 0){
                        done--
                    }
                    tskContainer.children[i].remove()
                }
            }
            tCnt.innerHTML = `${arrEle.length - done} tasks left`
        })
    }
    let tasks = document.querySelectorAll('.tasks .tsk')
    tasks.forEach((task ,i)=>{
       task.addEventListener('dragstart' , ()=>{
            setTimeout(() => task.classList.add('hide') , 0)
        })
        task.addEventListener('dragend' , ()=>{
           task.classList.remove('hide')
        })
        task.addEventListener('dragover' , (e)=>{
            let drag = document.querySelector('.hide')
            let SibTsk = [...document.querySelectorAll('.tsk:not(.hide)')]
            let nextTsk =  SibTsk.find(elem =>{
                return e.clientY <= elem.offsetTop + elem.offsetHeight / 2
            })
            tskContainer.insertBefore(drag , nextTsk)
            arrEle = []
            for (let i = 0; i <tskContainer.children.length; i++) {
                arrEle.push(tskContainer.children[i])   
            }
        })
    })
})


ul.forEach((el)=>{
    el.addEventListener('click' , ()=>{
        ul.forEach((ele)=>{
            ele.classList.remove('act')
        })
        el.classList.add('act')
        sort(el)
    })
})


//


function sort(el){
    if(el.classList.contains('completed')){
        document.querySelector('.addTxt').style.display = "none"
        for (let i = 0; i < arrEle.length ; i++) {
            if(!arrEle[i].children[0].classList.contains('done')){
                tskContainer.children[i].classList.add('none')
            }else{
                tskContainer.children[i].classList.remove('none')
            }
        }
    }else if(el.classList.contains('active')){
        document.querySelector('.addTxt').style.display = "block"
        for (let i = 0; i < arrEle.length ; i++) {
            if(arrEle[i].children[0].classList.contains('done')){
                tskContainer.children[i].classList.add('none')
            }else{
                tskContainer.children[i].classList.remove('none')
            }
        }
    }else{
        document.querySelector('.addTxt').style.display = "block"
        for (let i = 0; i < arrEle.length ; i++) {
            tskContainer.children[i].classList.remove('none')
        }
    }
}