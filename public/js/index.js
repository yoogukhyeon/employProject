

document.addEventListener("DOMContentLoaded", function() {
  
    document.getElementById('Name').onkeyup = function(e){
        var v = this.value;
        this.value = v.replace(/[A-Za-z0-9]|[\[\]{}()<>?|'~!@#$%^&*-_+=,.:;\"'\\]/g, "");
     
    }


    document.getElementById('city').onkeyup = function(e){
        var v = this.value;
        this.value = v.replace(/[A-Za-z0-9]|[\[\]{}()<>?|'~!@#$%^&*-_+=,.:;\"'\\]/g, "");
      
    }



         /*핸드폰 자동 하이픈*/
         function autoHypenPhone(str){
            str = str.replace(/[^0-9]/g, '');
            var tmp = '';
            if( str.length < 4){
                return str;
            }else if(str.length < 7){
                tmp += str.substr(0, 3);
                tmp += '-';
                tmp += str.substr(3);
                return tmp;
            }else if(str.length < 11){
                tmp += str.substr(0, 3);
                tmp += '-';
                tmp += str.substr(3, 3);
                tmp += '-';
                tmp += str.substr(6);
                return tmp;
            }else{              
                tmp += str.substr(0, 3);
                tmp += '-';
                tmp += str.substr(3, 4);
                tmp += '-';
                tmp += str.substr(7);
                return tmp;
            }
            return str;
        }

        var cellPhone = document.getElementById('mobile');
        cellPhone.onkeyup = function(event){
                event = event || window.event;
                var _val = this.value.trim();
                this.value = autoHypenPhone(_val) ;
        }

  
});