export const createPhoto = (photo) => {
    return $.ajax({
        url: '/api/photos',
        method: 'POST',
        data: photo,
        contentType: false,
        processData: false
    })
}

export const fetchAllPhotos = () => {
    return $.ajax({
        url: '/api/photos',
        method: 'GET'
    })
}

export const fetchPhoto = (photoId) => {
    return $.ajax({
        url: `/api/photos/${photoId}`,
        method: 'GET'
    })
}

export const updatePhoto = (photo) => {
    return $.ajax({
        url: `/api/photos/${photo.id}`,
        method: 'PATCH',
        data: { photo }
    })
}

export const deletePhoto = (photoId) => {
    return $.ajax({
        url: `/api/photos/${photoId}`,
        method: 'DELETE'
    })
}