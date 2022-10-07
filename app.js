document.addEventListener("DOMContentLoaded",()=>{
    new Glide(".glide",{
        type: "carousel",
        startAt: 0,
        animationTimingFunc: "ease-in-out",
        gap:100,
        perView:3,
    }).mount()

    let prev = document.querySelector("#prev");
    let next = document.querySelector("#next");
    let bgImgs = [
        "https://images.unsplash.com/photo-1604649414311-4fa144002b00?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1625&q=80",
        "https://images.unsplash.com/photo-1457460866886-40ef8d4b42a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
        "https://images.unsplash.com/photo-1598866594230-a7c12756260f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1608&q=80",
        "https://images.unsplash.com/photo-1612783322327-32aee68ad0a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            ]
    let background = document.querySelector(".background");
    let indexs = document.querySelectorAll(".index");  
    let currentIndex = 0;
    indexs.forEach(index=>{
        index.classList.remove("active")
    })      
    indexs[currentIndex].classList.add("active")
    let myAnimation = new hoverEffect({
        parent: document.querySelector(".background"),
        intensity: 0.3,
        imagesRatio: 1080/ 1920,
        image1: `${bgImgs[0]}`,
        image2: `${bgImgs[1]}`,
        displacementImage: "https://images.unsplash.com/photo-1506458539166-34079f9e1d2c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1009&q=80",
        hover: false,
    })
    let myAnimation2 = new hoverEffect({
        parent: document.querySelector(".background"),
        intensity: 0.3,
        imagesRatio: 1080/ 1920,
        image1: `${bgImgs[1]}`,
        image2: `${bgImgs[2]}`,
        displacementImage: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1022&q=80",
        hover: false,
    })
    let myAnimation3 = new hoverEffect({
        parent: document.querySelector(".background"),
        intensity: 0.3,
        imagesRatio: 1080/ 1920,
        image1: `${bgImgs[2]}`,
        image2: `${bgImgs[3]}`,
        displacementImage: "https://images.unsplash.com/photo-1516100882582-96c3a05fe590?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
        hover: false,
    })
    let myAnimation4 = new hoverEffect({
        parent: document.querySelector(".background"),
        intensity: 0.3,
        imagesRatio: 1080/ 1920,
        image1: `${bgImgs[3]}`,
        image2: `${bgImgs[0]}`,
        displacementImage: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80",
        hover: false,
    })
    let distortionAnimation = [
        myAnimation,
        myAnimation2,
        myAnimation3,
        myAnimation4
    ]
    function startNextDistortionAnimation ()
    {
        let prevIndex = currentIndex;
        currentIndex = (currentIndex + 1) % 4;
        indexs.forEach(index=>{
            index.classList.remove("active")
        })      
        indexs[currentIndex].classList.add("active");
        distortionAnimation[prevIndex].next();
        showDirection("next");
        setTimeout(()=>{
            let canvas = background.querySelectorAll("canvas");
            background.appendChild(canvas[0]);
            distortionAnimation[prevIndex].previous();
        },1200);
    }
    function startPrevDistortionAnimation ()
    {
        let prevIndex = currentIndex;
        currentIndex = currentIndex - 1 < 0 ? 3 : currentIndex - 1;
        indexs.forEach(index=>{
            index.classList.remove("active")
        })
        indexs[currentIndex].classList.add("active");
        distortionAnimation[prevIndex].next();
        showDirection("prev");
        setTimeout(()=>{
            let canvas = background.querySelectorAll("canvas");
            background.insertBefore(canvas[canvas.length - 1],background.firstChild);
            distortionAnimation[prevIndex].previous();
        },500);
    }
    next.addEventListener("click",()=>{
        startNextDistortionAnimation();
    })
    prev.addEventListener("click",()=>{
        startPrevDistortionAnimation();
    })
    let titleDisplacement = 0;
    let descriptionDisplacement = 0;
    function showDirection(direction)
    {
        if(direction === "prev" && titleDisplacement === 0)
        {
            titleDisplacement = -400; 

        }else if(direction === "next" && titleDisplacement === -400)
        {
            titleDisplacement = 0;
        }else
        {
        titleDisplacement = (direction === "next") ? titleDisplacement - 140 : titleDisplacement + 140;

        }

        if(direction === "prev" && descriptionDisplacement === 0)
        {
            descriptionDisplacement = -160; 

        }else if(direction === "next" && descriptionDisplacement === -160)
        {
            descriptionDisplacement = 0;
        }else
        {
        descriptionDisplacement = (direction === "next") ? descriptionDisplacement - 53 : descriptionDisplacement + 53;

        }

        let titles = document.querySelectorAll(".title h4");
    titles.forEach(title=>{
        TweenMax.to(title,1,{
            top : `${titleDisplacement}px`,
            ease: Storage.easeInOut
        })
    })

    let descriptions = document.querySelectorAll(".description p");
    descriptions.forEach((describe,index)=>{
        let opacity = 0;
        if(index === currentIndex)
        {
            opacity = 1;
        }else
        {
            opacity = 0;
        }
        TweenMax.to(describe,1,{
            top : `${descriptionDisplacement}px`,
            ease: Storage.easeInOut,
            opacity : opacity,
        })
    })
    }
})