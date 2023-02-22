import { config } from "../../config"
import ReservationOption from "../../components/ReservationOption"
import { Reservation } from "@/entities"
import { eachHourOfInterval, startOfToday } from "date-fns"
//import css
import styles from "./Reservation.module.css"
let { closingHours, openingHours,reservationDuration } = config

    const today = startOfToday()
    const todayString = today.toString()
    const todaySplited = todayString.split(' ').splice(0, 4).join(' ')
    const todayWithStartHour = todaySplited+` ${openingHours}:00 GMT+0300 (GMT+03:00)`
    const todayWithEndHour = todaySplited+` ${closingHours}:00 GMT+0300 (GMT+03:00)`
    const newHours = eachHourOfInterval({start:new Date(todayWithStartHour), end:new Date(todayWithEndHour)})

const reservations:Reservation[] = []
// reservations.push(new Reservation({
//     start: new Date(todayWithStartHour),
//     customer: {id:"1290ei"},
//     employee: {id:"1290ei"},
// }))

export default () => {
    return <div>
        {
            // reservations.map(reservationData => {
            //     return <ReservationOption {...reservationData} />
            // })
            // newHours u maple ve ReservationOption'a gönder
            newHours.map(hour => {
                return <ReservationOption start={hour}/>
            })
        }
    </div>
}
