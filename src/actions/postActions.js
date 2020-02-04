import { FETCH_POSTS, POST_STATUS } from '../actionTypes';
import { database, storage } from '../firebase';

export function getPosts() {
    return dispatch => {
        dispatch({
            type: POST_STATUS,
            payload: true
        });
        database.on(
            'value',
            snapshot => {
                dispatch({
                    type: FETCH_POSTS,
                    payload: snapshot.val()
                });
                dispatch({
                    type: POST_STATUS,
                    payload: false
                });
            },
            () => {
                dispatch({
                    type: POST_STATUS,
                    payload: -1
                });
            }
        );
    };
}

export function savePost(post, image) {
    return dispatch =>
        database.push(post).then(post => {
            if (post !== null) {
                storage
                    .child(`posts/${image.name}`)
                    .put(image, { contentType: image.type })
                    .then(snapshot => {
                        database.child(post.key).update({
                            image: snapshot.metadata.downloadURLs[0]
                        });
                    });
            }
        });
}

export function editPost(id, post) {
    return dispatch => database.child(id).update(post);
}

export function deletePost(id) {
    return dispatch => database.child(id).remove();
}

export function saveComment(postId, comment) {
    return dispatch =>
        database
            .child(postId)
            .child('comments')
            .push({ body: comment.body });
}

export function imageUpload(postId, image) {
    return dispatch =>
        storage
            .child(`posts/${image.name}`)
            .put(image, { contentType: image.type })
            .then(snapshot => {
                database.child(postId).update({
                    image: snapshot.metadata.downloadURLs[0]
                });
            });
}

