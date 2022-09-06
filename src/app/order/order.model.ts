class Order {
    constructor(
        public name: string,
        public email: string,
        public emailConfirmation: string,
        public adress: string, 
        public number: number,
        public optionalAddress: string,
        public paymentOption: string,
        public orderItems: OrderItem[] = []
        ){}
}

class OrderItem{
    constructor(public quantity: number, public menuId: string){}
}

export {Order, OrderItem}