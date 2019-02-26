import { Component, OnInit, Input,Output,EventEmitter,ElementRef,ViewChild,TemplateRef, SimpleChange } from '@angular/core';
 
@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})

export class PaginatorComponent implements OnInit {
  selectedLimit:any;
  pageList=[];
  pageSize:Number;
  currentPage =1;
  scrollLeft =0;
  @ViewChild(".scroll-box") scrollBox: TemplateRef<any>;

  @Input() limitOptions: any;
  @Input() total: Number;

  @Output() doFunction: EventEmitter<any> = new EventEmitter();

  constructor(private elementRef:ElementRef) {

    // console.log(this.elementRef.nativeElement.value);
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    this.setPageItem(changes.total.currentValue,this.selectedLimit);
  }

  setLimit(){
    this.doFunction.emit({currentLimit:this.selectedLimit,currentPage:1});
    this.setPageItem(this.total,this.selectedLimit);
  }

  selectedPage(item){
    this.currentPage = item;
    this.doFunction.emit({currentPage:item});
  }

  setPageItem(total,limit){ //set page item
    this.pageList=[];
    this.pageSize = Math.ceil(total / limit);
    for(let index=0;index < this.pageSize;index++){
      this.pageList.push(index+1);
    }
  }

  goPre(){
    if(this.currentPage>1){
      if(this.currentPage >6){
        this.scrollLeft = -(this.currentPage -7)*36;
      }else{
        this.scrollLeft =0
      }
      this.currentPage--;
      this.doFunction.emit({currentPage:this.currentPage});
    }
  }

  goNext(){
    if(this.currentPage < this.pageSize){
      if(this.currentPage >6){
        this.scrollLeft = -(this.currentPage -6)*36;
      }else{
        this.scrollLeft =0
      }
      this.currentPage++;
      this.doFunction.emit({currentPage:this.currentPage});
    }
  }

  ngOnInit() {
    this.selectedLimit = this.limitOptions[0];
    console.log(this.total);
    this.setPageItem(this.total,this.selectedLimit);
  }

}

