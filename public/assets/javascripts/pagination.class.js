
 class Pagination{
    constructor(options){
        
        this.id = options.id; 
        this.element = document.getElementById(this.id);
        this.tableID = options.tableID;
        this.tableBody = document.querySelector("#"+this.tableID+" tbody");
        this.tableElement = document.getElementById(this.tableID);

        // this.nextButton = this.element.getElementsByClassName('next')[0];
        // this.prevButton = this.element.getElementsByClassName('previous')[0];
        // this.firstButton = this.element.querySelector('a.first');
        // this.lastButton = this.element.querySelector('a.last');
        

        // this.paginationLabel = this.element.getElementsByClassName('pagination-label')[0];
        // this.cmbRowCount = this.element.querySelector(".cmb-row-count");
        this.cmbRowCount = 10;
        // this.noOfRows = options.noOfRows;    
        this.noOfRows = 10;      
        
        //default values        
        this.start = 1;
        this.end = this.noOfRows;
        this.currentPageNo = 1;
        this.init();
    }

    init(){        
        this.collectingTableInfo();
        this.addEvents(); 
              
    }

    collectingTableInfo(){
        
        this.totalRows = document.querySelectorAll("#"+this.tableID+" tbody tr");
        // this.totalNoOfRows = this.totalRows.length;
        this.totalNoOfRows = 50;
        
        if(this.totalNoOfRows <= this.noOfRows){            
            this.element.style.display = 'none';
        }else{
            this.generatePageButtons();
            this.showRows(this.totalRows, this.start, this.end);             
        }
    }

    generatePageButtons(){

        this.currentPageNo = 1;

        this.noOfPages = Math.ceil(this.totalNoOfRows / this.noOfRows);

        // remove pre generated buttons if exist
        // this.element.querySelectorAll(".btn-page").forEach(element => {
        //     element.remove();
        // });

    

        for(let i=1; i<=this.noOfPages; i++){
            let a = document.createElement('a');
            a.href = "#";
            a.setAttribute('data-page', i);
            a.className = "round btn-page btn-page-"+i;
            if(i === this.currentPageNo){
                a.classList.add("active");
            }
            a.innerHTML = i;
            a.addEventListener('click', (e)=>this.jumpToPage(e));
            // this.element.querySelector(".last").insertBefore(a, this.element.querySelector('.next'));
            
        }

    }

    addEvents(){
        this.nextButton.addEventListener('click', ()=>this.onNext());
        this.prevButton.addEventListener('click', ()=>this.onPrevious());
        this.firstButton.addEventListener('click', ()=>this.onFirst());
        this.lastButton.addEventListener('click', ()=>this.onLast());

        this.cmbRowCount.addEventListener('change', (e)=>this.onRowCountChange(e));
    }

    onNext(){
        
        this.currentPageNo++;

        this.goToThePage();
    }

    onPrevious(){
        
        this.currentPageNo--;
        this.goToThePage();

    }

    onFirst(){
        console.log('asfljsd');
        this.currentPageNo = 1;
        this.goToThePage();
    }

    onLast(){
        this.currentPageNo = this.noOfPages;
        console.log(this.currentPageNo);
        this.goToThePage();
    }

    jumpToPage(e){
        this.currentPageNo = parseInt(e.target.getAttribute('data-page'));
        console.log("this.currentPageNo:" + this.currentPageNo)
        this.goToThePage();
    }

    goToThePage(){
        this.start = ((this.currentPageNo - 1) * this.noOfRows) + 1;
        this.end = this.start + this.noOfRows - 1;

        if(this.end >= this.totalNoOfRows){
            this.end = this.totalNoOfRows;                     
        }
        
        this.showRows(this.totalRows, this.start, this.end);


    }
    
    onRowCountChange(e){
        this.noOfRows = parseInt(e.target.value);
        this.generatePageButtons();
        this.start = 1;
        this.end = this.noOfRows;
        this.showRows(this.totalRows, this.start, this.end); 
    }
    
    showRows(rows, start, end){
        
        start = start -1;
        end = end - 1;         
        
        this.tableBody.innerHTML = "";
        
        for(let i=0; i<rows.length; i++ ){
            if(i >= start && i <= end){
                this.tableBody.appendChild(rows[i]);                
            }           
        }
        
        this.updatePagination();
    }
    
    updatePagination(){
        
        if(this.end == this.totalNoOfRows ){
            this.nextButton.style.display = 'none';
            this.lastButton.style.display = 'none';
        }else{
            this.nextButton.style.display = 'block';
            this.lastButton.style.display = 'block';
        }     
        
        if(this.start == 1){
            this.prevButton.style.display = 'none';
            this.firstButton.style.display = 'none';
        }else{
            this.prevButton.style.display = 'block';
            this.firstButton.style.display = 'block';
        }    

        document.querySelector(".btn-page.active").classList.remove('active');
        document.querySelector(".btn-page-"+this.currentPageNo).classList.add('active');

       this.paginationLabel.innerHTML = "Viewing <span>"+this.start+"-"+this.end+"</span> of <span>"+this.totalNoOfRows+"</span>"; 
    }
}