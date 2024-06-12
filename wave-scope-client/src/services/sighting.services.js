import axios from 'axios'

class SightingServices {

    constructor() {

        this.axiosApp = axios.create({
            baseURL: `${import.meta.env.VITE_API_URL}/api/sightings`
        })

        this.axiosApp.interceptors.request.use(config => {

            const storedToken = localStorage.getItem('authToken');

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` };
            }

            return config
        })
    }

    getAllSightings(options) {
        return this.axiosApp.get('/', {
            params: options
        })
    }

    getAllSightingsByBeach(beachId) {
        return this.axiosApp.get(`/sightingsByBeach/${beachId}`)
    }

    getOneSighting(sightingId) {
        return this.axiosApp.get(`/${sightingId}`)
    }

    newSighting(sightingData) {
        return this.axiosApp.post('/', sightingData)
    }

    editSighting(sightingId, sightingData) {
        return this.axiosApp.put(`/${sightingId}`, sightingData)
    }

    deleteSighting(sightingId) {
        return this.axiosApp.delete(`/${sightingId}`)
    }

    confirmSighting(sightingId) {
        return this.axiosApp.post(`/${sightingId}/confirmation`)
    }

    removeSightingConfirmation(sightingId) {
        return this.axiosApp.delete(`/${sightingId}/confirmation`)
    }

    rejectSighting(sightingId) {
        return this.axiosApp.post(`/${sightingId}/rejection`)
    }

    removeSightingRejection(sightingId) {
        return this.axiosApp.delete(`/${sightingId}/rejection`)
    }

}

const sightingServices = new SightingServices()

export default sightingServices