// In this file, we can define any type of request as follows:
// export async function GET(Request) {}
// export async function HEAD(Request) {}
// export async function POST(Request) {}
// export async function PUT(Request) {}
// export async function DELETE(Request) {}
//  A simple GET Example

export async function GET(Request) {
    const jsonData = {
      "nodes": [
        {"id": "0", "name": "13/09", "x": 10, "y": 10, "category": 0},
        {"id": "1", "name": "14/09", "x": 10, "y": -10, "category": 1},
        {"id": "2", "name": "15/09", "x": -10, "y": -10, "category": 2},
        {"id": "3", "name": "16/09", "x": -10, "y": 10, "category": 3},
        {"id": "4", "name": "17/09", "x": 20, "y": -10, "category": 1},
        {"id": "5", "name": "18/09", "x": 15, "y": 15, "category": 0},
        {"id": "6", "name": "19/09", "x": -15, "y": 15, "category": 3},
        {"id": "7", "name": "20/09", "x": -15, "y": -15, "category": 2},
        {"id": "8", "name": "21/09", "x": 15, "y": -15, "category": 1},
        {"id": "9", "name": "22/09", "x": 30, "y": 10, "category": 0},
        {"id": "10", "name": "23/09", "x": 25, "y": -20, "category": 1},
        {"id": "11", "name": "24/09", "x": -20, "y": -25, "category": 2},
        {"id": "12", "name": "25/09", "x": -25, "y": 20, "category": 3},
        {"id": "13", "name": "26/09", "x": 5, "y": 25, "category": 0},
        {"id": "14", "name": "27/09", "x": 0, "y": -25, "category": 1},
        {"id": "15", "name": "28/09", "x": -5, "y": -20, "category": 2},
        {"id": "16", "name": "29/09", "x": -20, "y": 5, "category": 3},
        {"id": "17", "name": "30/09", "x": 20, "y": 20, "category": 0},
        {"id": "18", "name": "01/10", "x": 25, "y": -5, "category": 1},
        {"id": "19", "name": "02/10", "x": -10, "y": -10, "category": 2},
        {"id": "20", "name": "03/10", "x": -10, "y": 15, "category": 3},
        {"id": "21", "name": "04/10", "x": 15, "y": 0, "category": 0},
        {"id": "22", "name": "05/10", "x": 5, "y": -5, "category": 1},
        {"id": "23", "name": "06/10", "x": -5, "y": -5, "category": 2},
        {"id": "24", "name": "07/10", "x": -5, "y": 5, "category": 3},
        {"id": "25", "name": "08/10", "x": 10, "y": 5, "category": 0},
        {"id": "26", "name": "09/10", "x": 20, "y": -5, "category": 1},
        {"id": "27", "name": "10/10", "x": -15, "y": -5, "category": 2},
        {"id": "28", "name": "11/10", "x": -15, "y": 10, "category": 3},
        {"id": "29", "name": "12/10", "x": 5, "y": 10, "category": 0}
      ],
      "links": [
        {"source": "0", "target": "1"},
        {"source": "1", "target": "2"},
        {"source": "2", "target": "3"},
        {"source": "3", "target": "4"},
        {"source": "4", "target": "5"},
        {"source": "5", "target": "6"},
        {"source": "6", "target": "7"},
        {"source": "7", "target": "8"},
        {"source": "8", "target": "9"},
        {"source": "9", "target": "10"},
        {"source": "10", "target": "11"},
        {"source": "11", "target": "12"},
        {"source": "12", "target": "13"},
        {"source": "13", "target": "14"},
        {"source": "14", "target": "15"},
        {"source": "15", "target": "16"},
        {"source": "16", "target": "17"},
        {"source": "17", "target": "18"},
        {"source": "18", "target": "19"},
        {"source": "19", "target": "20"},
        {"source": "20", "target": "21"},
        {"source": "21", "target": "22"},
        {"source": "22", "target": "23"},
        {"source": "23", "target": "24"},
        {"source": "24", "target": "25"},
        {"source": "25", "target": "26"},
        {"source": "26", "target": "27"},
        {"source": "27", "target": "28"},
        {"source": "28", "target": "29"}
      ],
      "categories": [
        {"name": "category0"},
        {"name": "category1"},
        {"name": "category2"},
        {"name": "category3"}
      ]
    };
  
    return new Response(JSON.stringify(jsonData), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  