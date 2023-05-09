import "@fullcalendar/react/dist/vdom";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { CalendarOptions } from "@fullcalendar/common";

interface ICalendar {
  events : Array< {deskripsi: string, mulai: string, selesai: string}> | undefined
}


function Main({events}: ICalendar ) {

  let newEvents = events?.map(({deskripsi,mulai,selesai}) => {
    return {
      title: deskripsi,
      start: mulai,
      end: selesai
    }
  })

  const options: CalendarOptions = {
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    droppable: false,
    
    // headerToolbar: {
    //   left: "prev,next today",
    //   center: "title",
    //   right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
    // },
    // navLinks: true,
    editable: true,
    // dayMaxEvents: true,
    events: newEvents,
    drop: function (info) {
      if (
        document.querySelectorAll("#checkbox-events").length &&
        (document.querySelectorAll("#checkbox-events")[0] as HTMLInputElement)
          ?.checked
      ) {
        (info.draggedEl.parentNode as HTMLElement).remove();
        if (
          document.querySelectorAll("#calendar-events")[0].children.length == 1
        ) {
          document
            .querySelectorAll("#calendar-no-events")[0]
            .classList.remove("hidden");
        }
      }
    },
  };

  return (
    <div className="full-calendar">
      <FullCalendar {...options} />
    </div>
  );
}

export default Main;
