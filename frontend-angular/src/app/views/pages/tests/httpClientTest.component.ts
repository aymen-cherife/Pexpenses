import { HttpClientModule } from '@angular/common/http'; // Ensure this is imported
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
    selector: 'app-register-test',
    template: `<p>Test Component</p>`,
    standalone: true,
    imports: [HttpClientModule]
})
export class RegisterTestComponent {
    constructor(private http: HttpClient) {
        console.log('HttpClient injected:', this.http);
        // Attempt a simple GET request to confirm HTTP client functionality
        this.http.get('https://jsonplaceholder.typicode.com/todos/1').subscribe({
            next: (response) => console.log('HTTP response:', response),
            error: (error) => console.error('HTTP error:', error)
        });
    }
}
