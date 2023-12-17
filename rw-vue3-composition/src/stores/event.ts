import { defineStore } from 'pinia'
import type { EventType } from '@/types/Event'
// import EventService from '@/services/EventServices'

export const useEventStore = defineStore("event", {
  state: () => ({
    id: 0,
    events: [] as EventType[],
  }),
  actions: {
    addEvents(eventList: EventType[]) {
      console.log(eventList)
      this.events = eventList
    },
    addEvent(event: EventType) {
      this.events.push({ ...event, id: this.id++ })
    },
    deleteEvent(id: number) {
      this.events = this.events.filter((object) => object.id !== id);
    },
    /*  getEvents(perPage: number, page: number) {
          return new Promise((resolve, reject) => {
            EventService.getEvents(perPage, page)
              .then((response) => {
                this.addEvents(response.data)
                resolve(response);
              })
              .catch((error) => {
                reject(error);
              })
          })
        }, */
  },
  // getters: {}
});
