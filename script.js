let inp = document.getElementById("link");
var mode = "none";
var count = 0;
var status;




$("#addButton").click(function (e) { 
    e.preventDefault();

    $("#link").toggle("slide",400);
    $("#addButton").toggleClass("sel");
    $("#addButton").toggleClass("notsel");
});

$("#delete").click(function (e) { 
    e.preventDefault();

    mode = "delete";

    $("#delete").toggleClass("sel");
    $("#delete").toggleClass("notsel");
    $("#move").removeClass("sel");
    $("#move").addClass("notsel");
    $("#text").removeClass("sel");
    $("#text").addClass("notsel");
});

$("#text").click(function (e) { 
    e.preventDefault();

    mode = "text";

    $("#text").toggleClass("sel");
    $("#text").toggleClass("notsel");
    $("#move").removeClass("sel");
    $("#move").addClass("notsel");
    $("#delete").removeClass("sel");
    $("#delete").addClass("notsel");
});


$("#move").click(function (e) { 
    e.preventDefault();
    

    $("#move").toggleClass("sel");
    $("#move").toggleClass("notsel");
    $("#delete").removeClass("sel");
    $("#delete").addClass("notsel");
    $("#text").removeClass("sel");
    $("#text").addClass("notsel");
    
    if(mode!="move"){
        mode="move";
        console.log("move");
        
    }
    else{
        mode="none";
        status = "not moving";
        console.log("none");
    }   

});


$("#link").keyup(function (e) { 
    if(e.keyCode==13){
        if(inp.value!=""){
            
            //image adding code here
            $(".images").append(`<img src="${inp.value}" alt="failed to load" class = "items"id="${count}">`);
            $(`#${count}`).click(function (e) { 

                
                e.preventDefault();


                if(mode=="delete"){
                    this.remove();
                }

                if(status!=`${this.id} not moving`){
                    status=`${this.id} not moving`;
                    console.log(status);
                }
                else{
                    status=`${this.id} moving`;
                    console.log(status);
                }
                
                    document.addEventListener('mousemove', (e) => {
                        if(mode=="move" && status==`${this.id} moving`){
                        let x = e.pageX;
                        let y = e.pageY;
                        this.style.left = (x+30 ) + "px";
                        this.style.top = (y-30) + "px";
                        }
                        else{
                            this.style.left = this.pageX;
                            this.style.top = this.pageY;
                        }
                      });
                      
                      document.addEventListener('mouseleave', (e) => {
                        if(mode=="move" && status==`${this.id} moving`){
                        let x = e.pageX;
                        let y = e.pageY;
                        this.style.left = (x+30) + "px";
                        this.style.top = (y+30) + "px";
                        }
                        else{
                            this.style.left = this.pageX;
                            this.style.top = this.pageY;
                        }
                      });

            });
            count=count+1;
            inp.value="";
        }
    }
});


$(".images").click(function (e) { 
    e.preventDefault();
    
    if(mode=="move text"){
        mode="none";
        $("#move").removeClass("sel");
        $("#move").addClass("notsel");
        $(`.bar`).css({"display":"none"});

    }

    if(mode == "text"){
        $("body").append(`
        <div id="${count}" class="ta">
        <div id="${count}bar" class="bar" ></div>
        <textarea id="${count}ta" name="w3review" rows="3" cols="40" placeholder="enter text here.."></textarea>
        </div>
        `);
        // $(`#${count}bar`).toggle();
        $(`#${count}`).css({"left":`${e.pageX}px`,"top":`${e.pageY}px`,"width":`${$(`${count}ta`).width()}`});
        mode = "none";
        $("#text").toggleClass("sel");
        $("#text").toggleClass("notsel");

        $(`#${count}`).click(function (e) { 
            e.preventDefault();
            
            if(mode=="delete"){
                this.remove();
            }

        });

        $(`#${count}ta`).focus(function (e) { 
            e.preventDefault();
            console.log("in");
            $(`.bar`).css({"display":"block"});

        });
        $(`#${count}`).focusout(function(e) {
            e.preventDefault();
            if(mode!="move text" && mode!="move"){
                console.log("out");
                $(`.bar`).css({"display":"none"});
            }
           
            

        });


        $(`#${count}bar`).click(function (e) { 
            e.preventDefault();
            mode="move text";
            console.log(this.id);
            if(status!=`${this.id} not moving`){
                status=`${this.id} not moving`;
                console.log(status);
            }
            else{
                status=`${this.id} moving`;
                console.log(status);
            }
            
                document.addEventListener('mousemove', (e) => {
                    if(mode=="move text" && status==`${this.id} moving`){
                    let x = e.pageX;
                    let y = e.pageY;
                    this.parentElement.style.left = (x -20) + "px";
                    this.parentElement.style.top = (y-2) + "px";
                    }
                    else{
                        this.parentElement.style.left = this.pageX;
                        this.parentElement.style.top = this.pageY;
                    }
                  });
                  
                  document.addEventListener('mouseleave', (e) => {
                    if(mode=="move text" && status==`${this.id} moving`){
                    let x = e.pageX;
                    let y = e.pageY;
                    this.parentElement.style.left = (x+30) + "px";
                    this.parentElement.style.top = (y+30) + "px";
                    }
                    else{
                        this.parentElement.style.left = this.pageX;
                        this.parentElement.style.top = this.pageY;
                    }
                  });


        });



        count=count+1;
    }

});






