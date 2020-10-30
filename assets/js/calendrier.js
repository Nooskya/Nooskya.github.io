var ns6=document.getElementById&&!document.all
var ie4=document.all
var n=document.layers

window.onload = function() {
    document.getElementById('CalPop').style.color = '#f00';
}

var Selected_Month;
var Selected_Year;
var Current_Date = new Date();
var Current_Month = Current_Date.getMonth();

var Days_in_Month = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
var Month_Label = new Array('Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre');

var Current_Year = Current_Date.getYear();
if (Current_Year < 1000)
Current_Year+=1900


var Today = Current_Date.getDate();

function Header(Year, Month) {

   if (Month == 1) {
   Days_in_Month[1] = ((Year % 400 == 0) || ((Year % 4 == 0) && (Year % 100 !=0))) ? 29 : 28;
   }
   var Header_String = Month_Label[Month] + ' ' + Year;
   return Header_String;
}



function Make_Calendar(Year, Month) {
   var First_Date = new Date(Year, Month, 1);
   var Heading = Header(Year, Month);
   var First_Day = First_Date.getDay() + 1;
   if (((Days_in_Month[Month] == 31) && (First_Day >= 6)) ||
       ((Days_in_Month[Month] == 30) && (First_Day == 7))) {
      var Rows = 6;
   }
   else if ((Days_in_Month[Month] == 28) && (First_Day == 1)) {
      var Rows = 4;
   }
   else {
      var Rows = 5;
   }

   var HTML_String = '<table class="table_calendar"><tr><td valign="top"><table BORDER=4 CELLSPACING=1 cellpadding=2 FRAME="box" BGCOLOR="C0C0C0" BORDERCOLORLIGHT="808080">';

   HTML_String += '<tr><th colspan=7 BGCOLOR="242943" BORDERCOLOR="000000">' + Heading + '</font></th></tr>';

   HTML_String += '<tr><th ALIGN="CENTER" BGCOLOR="2d3354" BORDERCOLOR="000000">Dim</th><th ALIGN="CENTER" BGCOLOR="2d3354" BORDERCOLOR="000000">Lun</th><th ALIGN="CENTER" BGCOLOR="2d3354" BORDERCOLOR="000000">Mar</th><th ALIGN="CENTER" BGCOLOR="2d3354" BORDERCOLOR="000000">Mer</th>';

   HTML_String += '<th ALIGN="CENTER" BGCOLOR="2d3354" BORDERCOLOR="000000">Jeu</th><th ALIGN="CENTER" BGCOLOR="2d3354" BORDERCOLOR="000000">Ven</th><th ALIGN="CENTER" BGCOLOR="2d3354" BORDERCOLOR="000000">Sam</th></tr>';

   var Day_Counter = 1;
   var Loop_Counter = 1;
   for (var j = 1; j <= Rows; j++) {
      HTML_String += '<tr ALIGN="center" VALIGN="top">';
      for (var i = 1; i < 8; i++) {
         if ((Loop_Counter >= First_Day) && (Day_Counter <= Days_in_Month[Month])) {
            if ((Day_Counter == Today) && (Year == Current_Year) && (Month == Current_Month)) {
               HTML_String += '<td BGCOLOR="FFFFFF" BORDERCOLOR="000000"><strong><font color="red">' + Day_Counter + '</font></strong></td>';
            }
            /* CONDITION POUR PERSONNALISER */
            else if(((Day_Counter >9) && (Day_Counter<32) && (Month == 4) && (Year==2021)) ||
                     ((Day_Counter>0) && (Day_Counter<26) && (Month == 5) && (Year==2021))){
                HTML_String +='<td BGCOLOR="#2ecc71" BORDERCOLOR="000000"><strong><font color="green">' + Day_Counter + '</font></strong></td>';
            }
            else if(((Day_Counter >16) && (Day_Counter<32) && (Month == 9) && (Year==2020)) ||
            ((Day_Counter>0) && (Day_Counter<2) && (Month == 10) && (Year==2020)) ||

            ((Day_Counter>18) && (Day_Counter<32) && (Month == 11) && (Year==2020)) ||
            ((Day_Counter>0) && (Day_Counter<4) && (Month == 0) && (Year==2021)) ||

            ((Day_Counter>12) && (Day_Counter<32) && (Month == 1) && (Year==2021)) ||
            
            ((Day_Counter>16) && (Day_Counter<32) && (Month == 3) && (Year==2021)) ||
            ((Day_Counter>0) && (Day_Counter<3) && (Month == 4) && (Year==2021)) ||

            ((Day_Counter>0) && (Day_Counter<1) && (Month == 2) && (Year==2021)) ||
            ((Day_Counter>0) && (Day_Counter<1) && (Month == 2) && (Year==2021)) 
            ){
                     HTML_String +='<td BGCOLOR="#4EA9A0" BORDERCOLOR="000000"><strong><font color="1a6390">' + Day_Counter + '</font></strong></td>';
            }
            /* FIN CONDITION POUR PERSONNALISER */
            else {
               HTML_String += '<td BGCOLOR="FFFFFF" BORDERCOLOR="000000"><font color="black">' + Day_Counter + '</font></td>';
            }
            Day_Counter++; 
            
         }
         else {
            HTML_String += '<td BORDERCOLOR="C0C0C0"> </td>';
         }
         Loop_Counter++;
      }
      HTML_String += '</tr>';
   }
   HTML_String += '</table></td></tr></table>';
   cross_el=ns6? document.getElementById("Calendar") : document.all.Calendar
   cross_el.innerHTML = HTML_String;
}


function Check_Nums() {
   if ((event.keyCode < 48) || (event.keyCode > 57)) {
      return false;
   }
}



function On_Year() {
   var Year = document.when.year.value;
   if (Year.length == 4) {
      Selected_Month = document.when.month.selectedIndex;
      Selected_Year = Year;
      Make_Calendar(Selected_Year, Selected_Month);
   }
}

function On_Month() {
   var Year = document.when.year.value;

   if (Year.length == 4) {
      Selected_Month = document.when.month.selectedIndex;
      Selected_Year = Year;
      Make_Calendar(Selected_Year, Selected_Month);
   }
   else {
      alert('Entrer une année valide.');
      document.when.year.focus();
   }


}


function Defaults() {
   if (!ie4&&!ns6)
   return
   var Mid_Screen = Math.round(document.body.clientWidth / 2);
   document.when.month.selectedIndex = Current_Month;
   document.when.year.value = Current_Year;
   Selected_Month = Current_Month;
   Selected_Year = Current_Year;
   Make_Calendar(Current_Year, Current_Month);
}


function Skip(Direction) {
   if (Direction == '+') {
      if (Selected_Month == 11) {
         Selected_Month = 0;
         Selected_Year++;
      }
      else {
         Selected_Month++;
      }
   }
   else {
      if (Selected_Month == 0) {
         Selected_Month = 11;
         Selected_Year--;
      }
      else {
         Selected_Month--;
      }
   }
   Make_Calendar(Selected_Year, Selected_Month);
   document.when.month.selectedIndex = Selected_Month;
   document.when.year.value = Selected_Year;
}
