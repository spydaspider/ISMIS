export default class CreateCart{
    constructor(itemName,quantity,costPrice,sellingPrice,bought,totalCost,id,quantityRemain,date,time,momo)
    {
        this.itemName = itemName;
        this.quantity = quantity;
        this.costPrice = costPrice;
        this.sellingPrice = sellingPrice;
        this.bought = bought;
        this.totalCost = totalCost;
        this.id = id;
        this.quantityRemain = quantityRemain;
        this.date = date;
        this.time = time;
        this.momo = false;
    } 

}