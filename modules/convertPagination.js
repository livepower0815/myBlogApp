


function convertPagination(articles,current_page,perPage) {
    const per_page = perPage;
    const total_page = Math.ceil(articles.length / per_page);
    let current_min = (current_page - 1) * per_page;
    let current_max = current_min + per_page;
    const resource = articles.slice(current_min, current_max);
    const page = {
        pageTotal: total_page,
        currnetPage: current_page,
        hasPre: current_page > 1,
        hasNext: current_page < total_page
    };
    return {
        resource,
        page
    };
}

module.exports = convertPagination;