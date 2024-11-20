
    
    const klase_x = 'x'
    const klase_o = 'circle'

    /*

    0 1 2
    3 4 5
    6 7 8

    */

    const uzvarasNosacijumi = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    const visisLaucini = document.querySelectorAll('.cell')
    const rezultatuLogs = document.querySelector('#resultBox')
    const rezultatuPazinojums = document.querySelector('.resultInfo')
    const restartButton = document.getElementById('restartButton')
    const attelotSpeletaju = document.querySelector('.display')
    const attRez = document.getElementById('attiestRez')
    
    let speletajsO
    let speletajsXPunkti = JSON.parse(localStorage.getItem("speletajsXPunkti")) || 0
    let speletajsOPunkti = JSON.parse(localStorage.getItem("speletajsOPunkti")) || 0

   

    saktSpeli()

    function saktSpeli(){
        speletajsO = false;
        
        visisLaucini.forEach(laucins => {
            laucins.classList.remove(klase_o);
            laucins.classList.remove(klase_x);
            laucins.classList.remove('uzvara')
            

            laucins.addEventListener('click', lietotajaDarbiba, {once:true});
        });
    }

    function lietotajaDarbiba(klikskis){
        const laucins = klikskis.target
        const aktivaisSpeletajs = speletajsO ? klase_o : klase_x;
        atzimetLaucinu(laucins, aktivaisSpeletajs)
        if(parbauditUzvaru(aktivaisSpeletajs)){
            

            setTimeout(beigtSpeli, 1000);
            iekrasotUzvaru(aktivaisSpeletajs)
        }else if(neizskirts()){
            
            beigtSpeli(true)
        }else {
           
            
            mainitSpeletaju()
            
        }
      
    }

    function atzimetLaucinu(laucins, aktivaisSpeletajs){
                
        
            laucins.classList.add(aktivaisSpeletajs)
    }

    function mainitSpeletaju(){
        
        speletajsO = !speletajsO
        attelotSpeletaju.innerText = `${speletajsO ? "O" : "X"}`
        if(speletajsO){
            document.body.style.backgroundColor = "#1a252c"
        }else {
            document.body.style.backgroundColor = "#1c2c1a"
        }
    }


    function parbauditUzvaru(aktivaisSpeletajs){

        
        return uzvarasNosacijumi.some(nosacijums => {
                return nosacijums.every(index => {
                    
                    return visisLaucini[index].classList.contains(aktivaisSpeletajs)
                })
            }
        )
    }
   
    function iekrasotUzvaru(aktivaisSpeletajs) {
        uzvarasNosacijumi.forEach(nosacijums => {
            if (nosacijums.every(index => visisLaucini[index].classList.contains(aktivaisSpeletajs))) {
                     nosacijums.forEach(index => visisLaucini[index].classList.add('uzvara'));
            }
        });
    }


    function neizskirts(){
        return [...visisLaucini].every(laucins => {
            return laucins.classList.contains(klase_o) || laucins.classList.contains(klase_x)
        })
    }


    function beigtSpeli(neizskirts){
       
        if(neizskirts){
            rezultatuPazinojums.innerText = `Neizšķirt Rezultāts!
            Spēlētāja O punkti: ${speletajsOPunkti}
            Spēlētāja X punkti: ${speletajsXPunkti}
            `
            attRez.addEventListener('click', function(){
                localStorage.setItem('speletajsXPunkti', JSON.stringify(0));
                localStorage.setItem('speletajsOPunkti', JSON.stringify(0));
                rezultatuPazinojums.innerText = `
                Spēlētājs ${speletajsO ? "O" : "X"} uzvarēja!
                Spēlētāja O punkti: ${speletajsOPunkti}
                Spēlētāja X punkti: ${speletajsXPunkti}
                `
            })
        }else {
            if(speletajsO){
                speletajsOPunkti ++
                localStorage.setItem('speletajsOPunkti', JSON.stringify(speletajsOPunkti));
            }else {
                speletajsXPunkti ++
                localStorage.setItem('speletajsXPunkti', JSON.stringify(speletajsXPunkti));
            }
            rezultatuPazinojums.innerText = `
            Spēlētājs ${speletajsO ? "O" : "X"} uzvarēja!
            Spēlētāja O punkti: ${speletajsOPunkti}
            Spēlētāja X punkti: ${speletajsXPunkti}
            `
            attRez.addEventListener('click', function(){
                localStorage.setItem('speletajsXPunkti', JSON.stringify(0));
                localStorage.setItem('speletajsOPunkti', JSON.stringify(0));
                speletajsOPunkti = 0
                speletajsXPunkti = 0
                rezultatuPazinojums.innerText = `
                Spēlētājs ${speletajsO ? "O" : "X"} uzvarēja!
                Spēlētāja O punkti: ${speletajsOPunkti}
                Spēlētāja X punkti: ${speletajsXPunkti}
                `
            })
           
        }
        rezultatuLogs.classList.add("show")
        restartButton.addEventListener('click', function(){
            rezultatuLogs.classList.remove("show")
            saktSpeli()
        })
    }

  
    


    
  


    