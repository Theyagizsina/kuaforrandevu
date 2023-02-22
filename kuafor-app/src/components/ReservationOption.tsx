import { Reservation } from "@/entities"
import {config} from "../config"
import styles from "./ReservationOption.module.css"
import { format } from "date-fns"

const {reservationDuration} = config

export default function ({ start }:Reservation) {
    return <div className={styles.resoption}>
        <div className={styles.hours}>
            <>{format(start,"HH:mm")} - {`${parseInt(format(start,"HH"))+reservationDuration}:00`}</>
        </div>
        <div className={styles.employees}>
            {/* {
                availableReservationSlots.map(slot => {
                    if(slot.hour == start.getHours()){
                        return <>Dolu</>
                    }else if(slot.hour != start.getHours()){
                        return null
                    }
                })
            } */}
            {/* {
                // tum calisanlarin doluluk durumlarini kontrol et
                // dolu olanlari ekrana yazdirma
                // dolu olmayanlari ekrana yazdir

                allEmployees.map(employee => {
                    return <div className={styles.employee}>
                        {employee.name}
                        <div className={styles.availability}>
                            {
                                reservations.map(reservation => {
                                    if(reservation.employee.id == employee.id && reservation.start == start.getHours()){
                                        return <>Dolu</>
                                    }else if(reservation.employee.id != employee.id && reservation.start != start.getHours()){
                                        return null}
                                })
                            }
                        </div>
                    </div>
                })
                

            } */}
            {/* {
                // check availableReservationSlots
                // if employee is not in bussyEmployees, show employee
                // if employee is in bussyEmployees, dont show employee
                availableReservationSlots.map(slot => {
                    if(slot.hour == start.getHours()){
                        return allEmployees.map(employee => {
                            if(!slot.bussyEmployees.includes(employee.id)){
                                return <div className={styles.employee}>
                                    {employee.name}
                                    <div className={styles.availability}>
                                        {
                                            reservations.map(reservation => {
                                                if(reservation.employee.id == employee.id && reservation.start == start.getHours()){
                                                    return <>Dolu</>
                                                }else if(reservation.employee.id != employee.id && reservation.start != start.getHours()){
                                                    return null}
                                            })
                                        }
                                    </div>
                                </div>
                            }
                        })
                    }else if(slot.hour != start.getHours()){
                        return null
                    }
                })              
            } */}
            {
                // check availableReservationSlots
                // if employee is not in bussyEmployees, show employee
                // if employee is in bussyEmployees, dont show employee
                // if all employees are in bussyEmployees, show "Dolu"
                availableReservationSlots.map(slot => {
                    if(slot.hour == start.getHours()){
                        return allEmployees.map(employee => {
                            if(!slot.bussyEmployees.includes(employee.id)){
                                return <div className={styles.employee}>
                                    {employee.name}
                                </div>
                            }
                        })
                    }else if(slot.hour != start.getHours()){
                        return null
                    }
                })
            }
        </div>
        
    </div>
} 

const allEmployees = [
    {id:123,name:"Jack"},
    {id:2,name:"Mack"},
    {id:32,name:"Cake"},
]

const reservations = [
    {
        employee: {id:123,name:"Jack"},
        customer: {id:44,name:"Hasan"},
        start: 12
    },
    {
        employee: {id:123,name:"Jack"},
        customer: {id:44,name:"Hasan"},
        start: 13
    },
    {
        employee: {id:2,name:"Mack"},
        customer: {id:44,name:"Hasan"},
        start: 12
    },
    {
        employee: {id:32,name:"Cake"},
        customer: {id:44,name:"Hasan"},
        start: 12
    }
]

const nonAvailabilities = allEmployees.map(employee => {
    return {
        ...employee,
        nonAvailableHours: reservations.filter(reservation => reservation.employee.id == employee.id).map(r => r.start).sort((a,b)=>(a-b))
    }
});

const availableReservationSlots = [9,10,11,12,13,14,15,16,17,18,19,20].map(hour => {
    return {
        hour,
        bussyEmployees: allEmployees.filter(employee => {
            return nonAvailabilities.find(na => employee.id == na.id && na.nonAvailableHours.includes(hour))
        }).map(e => e.id)
    }
})

console.table(nonAvailabilities)
console.table(availableReservationSlots)