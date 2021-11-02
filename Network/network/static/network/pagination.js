class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_page: "page-item disabled",
            second_page: "page-item active",
            third_page: "page-item",
            fourth_page: "page-item",
            fifth_page: "page-item",

            second: 1,
            third: 2,
            fourth: 3,

            current_page: 1,
        };
        this.CheckVisibility();
    }

    render() {
        return (
            <nav aria-label="Page navigation example">
                <ul className="pagination pagination-sm justify-content-center">
                    <li className={this.state.first_page}><a onClick={this.ChangePage} id="first-page" className="page-link">Previous</a></li>
                    <li className={this.state.second_page}><a onClick={this.ChangePage} id="second-page" className="page-link">{this.state.second}</a></li>
                    <li className={this.state.third_page}><a onClick={this.ChangePage} id="third-page" className="page-link">{this.state.third}</a></li>
                    <li className={this.state.fourth_page}><a onClick={this.ChangePage} id="fourth-page" className="page-link">{this.state.fourth}</a></li>
                    <li className={this.state.fifth_page}><a onClick={this.ChangePage} id="fifth-page" className="page-link">Next</a></li>
                </ul>
            </nav>
        );
    }

    CheckVisibility() {
        let page_count = 0;
        fetch(`/posts/${localStorage.getItem('posts_filter')}?start=0&end=0`)
        .then(response => response.json())
        .then(posts => {
            posts.forEach(post => {
                page_count = post.post_count/10;
                // console.log("page_count: ", page_count, '\n',
                // "second: ", this.state.second, '\n',
                // "third: ", this.state.third, '\n',
                // "fourth: ", this.state.fourth, '\n',
                // "current_page: ", this.state.current_page, '\n',
                // )

                if (this.state.second === this.state.current_page) {
                    this.setState({
                        second_page: "page-item active",
                        third_page: "page-item",
                        fourth_page: "page-item",
                    });
                }
                if (this.state.third === this.state.current_page) {
                    this.setState({
                        second_page: "page-item",
                        third_page: "page-item active",
                        fourth_page: "page-item",
                    });
                }
                if (this.state.fourth === this.state.current_page) {
                    this.setState({
                        second_page: "page-item",
                        third_page: "page-item",
                        fourth_page: "page-item active",
                    });
                }

                if (page_count > parseInt(this.state.second)-1 &&
                    page_count <= parseInt(this.state.second)) {
                    this.setState({
                        third_page: "page-item disabled",
                        fourth_page: "page-item disabled",
                        fifth_page: "page-item disabled",
                    });
                }

                if (page_count > parseInt(this.state.second) &&
                    page_count <= parseInt(this.state.third)) {
                    this.setState({
                        fourth_page: "page-item disabled",
                        fifth_page: "page-item disabled",
                    });
                }

                if (page_count > parseInt(this.state.third) &&
                    page_count <= parseInt(this.state.fourth)) {
                    this.setState({
                        fifth_page: "page-item disabled",
                    });
                }

                if (page_count > parseInt(this.state.third)) {
                    this.setState({
                        fifth_page: "page-item",
                    });
                }
                if (page_count <= parseInt(this.state.fourth)) {
                    this.setState({
                        fifth_page: "page-item disabled",
                    });
                }
                if (parseInt(this.state.second) === 1) {
                    this.setState({
                        first_page: "page-item disabled",
                    });
                }
            })
        })
    }

    ChangePage = (event) => {

        if (event.target.innerHTML === "Previous") {

            if (parseInt(this.state.second) !== 1) {
                this.setState(state => ({
                    second: state.second - 3,
                    third: state.third - 3,
                    fourth: state.fourth - 3,
                    second_page: "page-item",
                    third_page: "page-item",
                    fourth_page: "page-item",
                }));
            }

            this.CheckVisibility();
        }

        if (event.target.innerHTML === "Next") {

            this.setState(state => ({
                second: state.second + 3,
                third: state.third + 3,
                fourth: state.fourth + 3,
                first_page: "page-item",
                second_page: "page-item",
                third_page: "page-item",
                fourth_page: "page-item",
            }));

            this.CheckVisibility();

        }

        if (!isNaN(parseInt(event.target.innerHTML))) {

            this.setState({
                current_page: parseInt(event.target.innerHTML),
            })
            this.CheckVisibility();

            const page = parseInt(event.target.innerHTML)*10 - 10;
            retrieve_post(localStorage.getItem('posts_filter'), page, page + 10);
        }
    }

}

ReactDOM.render(<Pagination />, document.querySelector('#pagination'));
