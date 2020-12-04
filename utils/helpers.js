module.exports = {
    
    format_stock: stock => {
        if(stock>0){
            return `${stock} left in stock`
        } else {
            return 'Sold Out'
        }
    }
}