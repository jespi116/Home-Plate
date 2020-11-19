module.exports = {
    format_category: category => {
        if(category === 'all'){
            return 'ALL CATEGORIES';
        } else {
            return `${category} CATEGORY`
        }
    },
    format_stock: stock => {
        if(stock>0){
            return `${stock} left in stock`
        } else {
            return 'Sold Out'
        }
    }
}