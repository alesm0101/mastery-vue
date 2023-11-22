import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import EventCard from '../EventCard.vue'

describe('EventCard', () => {
  const eventMock = {
    id: 5928101,
    category: 'animal welfare',
    title: 'Cat Adoption Day',
    description: 'Find your new feline friend at this event.',
    location: 'Meow Town',
    date: 'January 28, 2022',
    time: '12:00',
    petsAllowed: true,
    organizer: 'Kat Laydee',
  }
  it('renders properly', () => {
    const wrapper = mount(EventCard, { props: { event: eventMock } })
    expect(wrapper.text()).toContain('Cat Adoption Day')
  })
})
