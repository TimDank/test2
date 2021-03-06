document.addEventListener('DOMContentLoaded', () => {

    //Connect to websocket
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    //Send a message to the server as soon as the page loads
    socket.emit("ciPageLoaded")

    //Load all comments as soon as the page loads
    socket.on("ciLoadComments", data => {
        //Load all comments
        var comments = data['comments'];
        console.log("logging");
        console.log(comments);

        for (var item in comments) {
            const li = document.createElement("li");
            li.innerHTML = comments[item];
            console.log("'li' text succesfully changed!");
            document.querySelector("#ciComment").append(li);
        }
    });

    var commentButton = document.getElementById("commentButton");
    commentButton.addEventListener("click", function() {
        var comment = document.getElementById("exampleFormControlTextarea1").value;
        console.log("Got comment from text area: " + comment);
        socket.emit("ciComment", {"comment": comment});
        console.log("Emit to server successful!");
    });

    socket.on("ciCommentAll", data => {
        //Append the comment to the comment section list
        const li = document.createElement("li");
        li.innerHTML = `${data.comment}`;
        console.log("Comment successfully received from server!");
        document.querySelector("ciComment").append(li);
    });
});