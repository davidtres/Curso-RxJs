import { Observable } from "rxjs";
import { Subscriber } from "rxjs/internal/Subscriber";

const onservableAlfa$ = new Observable(subscriber=>{
    subscriber.next(1);
    subscriber.next(2);
    subscriber.complete()
    subscriber.next(13);
    subscriber.next(a=b);
    subscriber.next('Mi primer observador');
    subscriber.next({test:true});
})

const observador = {
    next:(value)=>{
        console.log(value);
    },
    complete:()=>{console.log('Observer Completado');},
    error:(err)=>{
        console.error(err);
    }
}

onservableAlfa$.subscribe(observador)